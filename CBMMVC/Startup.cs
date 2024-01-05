using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Services;
using Respository;
using Microsoft.EntityFrameworkCore;

namespace CBMMVC
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
            services.AddControllersWithViews();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IExcelExportHelper, ExcelExportHelper>();
            services.AddScoped<IExpertKnowledgeService, ExpertKnowledgeService>();
            services.AddScoped<IExpertKnowledgeRespository,ExpertKnowledgeRespository>();
            services.AddScoped<IUserRespository, UserRespository>();
            services.AddScoped<ICheckDataService, CheckDataService>();
            services.AddScoped<ICheckDataRespository,CheckDataRespository>();
            services.AddScoped<IAlarmRespository, AlarmRespository>();
            services.AddScoped<IAlarmService, AlarmService>();
            services.AddScoped<IEarlyWarningRespository, EarlyWarningRespository>();
            services.AddScoped<IEarlyWarningService, EarlyWarningService>();
            services.AddDistributedMemoryCache().AddSession();
            services.AddSession();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Login}/{action=Index}/{id?}");
            });
        }
    }
}
