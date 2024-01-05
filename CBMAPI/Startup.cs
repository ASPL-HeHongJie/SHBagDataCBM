using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Respository;
using Services;
using System.IO;

namespace CBMAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContextPool<SQLServerDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SQLConnection")));
            services.AddControllers();
            services.AddCors(options =>
            {
                //options.AddDefaultPolicy(
                //builder =>
                //{

                //    builder.AllowAnyOrigin()
                //            .AllowAnyHeader()
                //            .AllowAnyMethod()
                //                        ;
                //});
                options.AddDefaultPolicy(
                builder =>
                {
                    builder.SetIsOriginAllowed(origin => true)
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials();
                });
            });
            //services.AddScoped<IPDBRespository, PDBResposiory>();
            services.AddSingleton<IPDBService, PDBService>();
            services.AddSingleton<IOPCClientService, OPCClientService>();
            services.AddScoped<IExcelExportHelper, ExcelExportHelper>();
            services.AddScoped<ITrendRepository, TrendRespository>();
            services.AddScoped<ITrendService, TrendService>();
            services.AddScoped<IAlarmRespository, AlarmRespository>();
            services.AddScoped<IAlarmService, AlarmService>();
            services.AddScoped<IDiagnosticDataRespository, DiagnositcDataRespository>();
            services.AddScoped<IDiagnosticDataService, DiagnosticDataService>();
            services.AddScoped<ICheckDataRespository, CheckDataRespository>();
            services.AddScoped<ICheckDataService, CheckDataService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHostApplicationLifetime appLifetime, IPDBService PDBService, IOPCClientService OPCClientService)
        {
            appLifetime.ApplicationStarted.Register(
                () => OnStarted(PDBService, OPCClientService)
            );
            appLifetime.ApplicationStopping.Register(OnStopping);
            appLifetime.ApplicationStopped.Register(OnStopped);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }



            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void OnStarted(IPDBService PDBService, IOPCClientService OPCClientService)
        {
            //应用开始
            WriteLog("Start");
            OPCClientService.SetOPCItems(PDBService.GetAllPDBTags().ToList());
            OPCClientService.Run();
            PDBService.Run();
        }
        private void OnStopping()
        {
            //应用开始
        }
        private void OnStopped()
        {
            //应用开始
            WriteLog("End");
        }
        private void WriteLog(string error)
        {
            if (!File.Exists(System.AppDomain.CurrentDomain.BaseDirectory + "Log.txt"))
            {
                File.Create(System.AppDomain.CurrentDomain.BaseDirectory + "ASPLog.txt").Dispose();

            }
            try
            {
                StreamWriter sw = new StreamWriter(System.AppDomain.CurrentDomain.BaseDirectory + "ASPLog.txt", true);
                sw.WriteLine(DateTime.Now.ToString() + "   " + error);
                sw.Flush();
                sw.Close();
            }
            catch (Exception ex)
            {
            }
        }

    }
}
