using NHibernate;
using NHibernate.Cfg;
using System;

namespace Infrastructure
{
    public class NhibernateSession
    {
        public static ISession OpenSession()
        {
            var configuration = new Configuration();
            var configurationPath = "hibernate.cfg.xml";
            configuration.Configure(configurationPath);
            try
            {
                var messageConfigurationFile = "Mappings/Message.hbm.xml";
                configuration.AddFile(messageConfigurationFile);
                var channelConfigurationFile = "Mappings/Channel.hbm.xml";
                configuration.AddFile(channelConfigurationFile);
                var userConfigurationFile = "Mappings/User.hbm.xml";
                configuration.AddFile(userConfigurationFile);
                ISessionFactory sessionFactory = configuration.BuildSessionFactory();
                return sessionFactory.OpenSession();
            }
            catch (Exception)
            {
                var messageConfigurationFile = "../Core/Mappings/Message.hbm.xml";
                configuration.AddFile(messageConfigurationFile);
                var channelConfigurationFile = "../Core/Mappings/Channel.hbm.xml";
                configuration.AddFile(channelConfigurationFile);
                var userConfigurationFile = "../Core/Mappings/User.hbm.xml";
                configuration.AddFile(userConfigurationFile);
                ISessionFactory sessionFactory = configuration.BuildSessionFactory();
                return sessionFactory.OpenSession();
            }

        }
    }
}
