using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NHibernate.Cfg;
using NHibernate.Dialect;
using NHibernate.Driver;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //This is how Nhibernate connects to the database
            //var cfg = new Configuration();
            //cfg.DataBaseIntegration(x =>
            //{
            //    x.ConnectionString = "Server=localhost;Database=Twinkle;Intergrated Security=SSPI;";
            //    //what sql type you are using
            //    x.Driver<NpgsqlDriver>();
            //    //Which version are you using
            //    x.Dialect<PostgreSQL83Dialect>();

            //});

            //cfg.AddAssembly(Assembly.GetExecutingAssembly());
            //var sessionFactory = cfg.BuildSessionFactory();
            //using (var session = sessionFactory.OpenSession())
            //using (var tx = session.BeginTransaction())
            //{
            //    //perform database logic
            //    tx.Commit();
            //}

                CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
