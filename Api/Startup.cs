using Core.Abstruct.Base;
using Data.Base;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // configure db
            services.AddDbContextPool<DataContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")), poolSize: 25);

            // configure DI
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            //configure cors
            services.AddCors(options =>
            {
                options.AddPolicy("AppCorsPolicy", builder =>
                {
                    var origins = Configuration.GetValue<string>("AllowedOrigins").Split(";");
                    builder.WithOrigins(origins).AllowAnyMethod().AllowAnyHeader();
                });
            });

            // configure cookies
            services.ConfigureApplicationCookie(opt =>
            {
                opt.Cookie.Name = "auth_cookie";
                opt.Cookie.SameSite = SameSiteMode.None;
                opt.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToAccessDenied = redirectContext =>
                    {
                        redirectContext.HttpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                        return Task.CompletedTask;
                    },
                    OnRedirectToLogin = redirectContext =>
                    {
                        redirectContext.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        return Task.CompletedTask;
                    }
                };
            });

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AppCorsPolicy");
            app.UseStaticFiles(
                //new StaticFileOptions()
                //{
                //    OnPrepareResponse = ctx => {
                //        ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
                //        ctx.Context.Response.Headers.Append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                //    },
                //    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot")),
                //    RequestPath = new PathString("")
                //}
                );
            app.UseRouting();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
