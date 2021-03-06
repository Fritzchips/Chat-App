using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using API.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Infrastructure;
using API.Authorization.Utilities;
using NHibernate.NetCore;
using NHibernate;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JwtConfig>(_configuration.GetSection("JwtConfig"));
            services.Configure<DatabaseConfig>(_configuration.GetSection("Database"));
            
            services.AddControllers();
            services.AddSignalR();
            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "client/build";
            });

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(x =>
            {
                var tokenKey = Encoding.ASCII.GetBytes(_configuration["JwtConfig:Secret"]);

                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(tokenKey),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                };
            });

            services.AddSingleton<IJwtAuthenticationHandler>(new JwtAuthenticationHandler(_configuration["JwtConfig:Secret"]));

            services.AddSingleton<INhibernateSession>(new NhibernateSession
                (_configuration["Database:Server"],
                _configuration["Database:Database"],
                _configuration["Database:UserId"],
                _configuration["Database:Password"]));

            services.AddSingleton<INhibernateHandler>(x =>
                new NhibernateHandler(x.GetService<INhibernateSession>()));
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chatbox/chat");
            });

            
            app.UseSpa(configuration: spa =>
            {
                spa.Options.SourcePath = "client";
                if (env.IsDevelopment())
                {
                spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
                
        }        
    }
}
