using NHibernate;
using NHibernate.Cfg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class ChannelSession
    {
        public static ISession OpenSession()
        {
            var configuration = new Configuration();
            var configurationPath = "../Core/hibernate.cfg.xml";
            configuration.Configure(configurationPath);
            var channelConfigurationFile = "../Core/Mappings/Channel.hbm.xml";
            configuration.AddFile(channelConfigurationFile);
            ISessionFactory sessionFactory = configuration.BuildSessionFactory();
            return sessionFactory.OpenSession();
        }
    }
}
