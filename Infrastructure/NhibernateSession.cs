﻿using NHibernate;
using NHibernate.Cfg;

namespace Infrastructure
{
    public class NhibernateSession
    {
        public static ISession OpenSession()
        {
            var configuration = new Configuration();
            var configurationPath = "../Core/hibernate.cfg.xml";
            configuration.Configure(configurationPath);
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
