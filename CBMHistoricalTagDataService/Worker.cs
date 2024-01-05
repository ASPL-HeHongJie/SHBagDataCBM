using InfluxDB.Client;
using InfluxDB.Client.Api.Domain;
using InfluxDB.Client.Writes;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CBMHistoricalTagDataService
{
    public class Worker : BackgroundService
    {
        private readonly IConfiguration _Configuration;
        public InfluxDBClient client;
        public Worker(ILogger<Worker> logger, IConfiguration configuration)
        {
         _Configuration = configuration;
        }

        //重写BackgroundService.StartAsync方法，在开始服务的时候，执行一些处理逻辑，这里我们仅输出一条日志
        public override async Task StartAsync(CancellationToken cancellationToken)
        {

            WriteLog("Worker starting");
            client = InfluxDBClientFactory.Create(_Configuration["InfluxDBAddress"], _Configuration["Token"].ToCharArray());

            await base.StartAsync(cancellationToken);
        }

        //第一个 windows服务或linux守护程序 的处理逻辑，由RunTaskOne方法内部启动的Task任务线程进行处理，同样可以从参数CancellationToken stoppingToken中的IsCancellationRequested属性，得知Worker Service服务是否已经被停止
        protected Task RunTaskOne(CancellationToken stoppingToken)
        {
            return Task.Run(() =>
            {
                //如果服务被停止，那么下面的IsCancellationRequested会返回true，我们就应该结束循环
                while (!stoppingToken.IsCancellationRequested)
                {
                    SQLServerDBContext _context = new SQLServerDBContext(_Configuration["SQLConnection"]);
                    List<HistoricalTag> tags =  _context.HistoricalTags.FromSqlRaw($@"SELECT [tRealtimeTagData].Name  
	                                                                      ,case when [tRealtimeTagData].Quality='Good' then convert(float,[tRealtimeTagData].Value) 
											                                                                      else NULL 
	                                                                       end as [Value] 
                                                                      FROM [CBMDB].[dbo].[tStationLoop] WITH (NOLOCK)  
                                                                      inner join 
                                                                      tStation  WITH (NOLOCK) 
                                                                      on 
                                                                      [tStationLoop].StationID=[tStation].ID 
                                                                      inner join 
                                                                      tTrendGroup  WITH (NOLOCK) 
                                                                      on 
                                                                      [tStationLoop].[CollectDataTypeID]=[tTrendGroup].CollectDataTypeID 
                                                                      inner join 
                                                                      tTrendTag  WITH (NOLOCK) 
                                                                      on 
                                                                      [tTrendGroup].ID=[tTrendTag].TrendGroupID 
                                                                      inner join 
                                                                      tRealtimeTagData  WITH (NOLOCK) 
                                                                      on 
                                                                      [tRealtimeTagData].Name= [tStation].[AbbrName]+ '_'+[tStationLoop].[AbbrName] + '_' + [tTrendTag].[Name]").ToList();
                    DateTime beginTime = DateTime.Now;
                    //DateTime endtime;
                    DateTime time = beginTime.ToUniversalTime();
                    List<PointData> points = new List<PointData>();
                    foreach (HistoricalTag tag in tags)
                    {
                        var point = PointData
                              .Measurement("tHistoricalTagData")
                              .Tag("TagName", tag.Name)
                              .Field("Value", tag.Value.GetValueOrDefault(0))
                              .Timestamp(time, WritePrecision.Ns);
                        points.Add(point);
                    }
                    using (var writeApi = client.GetWriteApi())
                    {
                        writeApi.WritePoints(_Configuration["Bucket"], "AlliedSolutions", points);
                    }

                    Thread.Sleep(300000);
                }
                //  _logger.LogInformation("RunTaskOne stop at: {time}", DateTimeOffset.Now);
            }, stoppingToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                Task taskOne = RunTaskOne(stoppingToken);
                //Task taskTwo = RunTaskTwo(stoppingToken);
                //Task taskThree = RunTaskThree(stoppingToken);

                await Task.WhenAll(taskOne);//使用await关键字，异步等待RunTaskOne、RunTaskTwo、RunTaskThree方法返回的三个Task对象完成，这样调用ExecuteAsync方法的线程会立即返回，不会卡在这里被阻塞
            }
            catch (Exception ex)
            {
                //RunTaskOne、RunTaskTwo、RunTaskThree方法中，异常捕获后的处理逻辑，这里我们仅输出一条日志 
                WriteLog(ex.Message);
            }
            finally
            {
                //Worker Service服务停止后，如果有需要收尾的逻辑，可以写在这里

            }
        }

        //重写BackgroundService.StopAsync方法，在结束服务的时候，执行一些处理逻辑，这里我们仅输出一条日志
        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await base.StopAsync(cancellationToken);
        }

        private void WriteLog(string strlog)
        {

            try
            {
                StreamWriter sw = new StreamWriter(System.AppDomain.CurrentDomain.BaseDirectory + "Log.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + "   " + strlog);
                sw.Flush();
                sw.Close();
            }
            catch (Exception ex)
            {
            }
        }
    }
}
