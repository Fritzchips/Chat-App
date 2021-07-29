using NHibernate;
using NHibernate.Cfg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class UserSession
    {
        public static ISession OpenSession()
        {
            var configuration = new Configuration();
            var configurationPath = "../Core/hibernate.cfg.xml";
            configuration.Configure(configurationPath);
            var userConfigurationFile = "../Core/Mappings/User.hbm.xml";
            configuration.AddFile(userConfigurationFile);
            ISessionFactory sessionFactory = configuration.BuildSessionFactory();
            return sessionFactory.OpenSession();
        }
    }
}
