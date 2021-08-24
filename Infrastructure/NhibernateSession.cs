using NHibernate;
using NHibernate.Cfg;
using System;

namespace Infrastructure
{
    public class NhibernateSession : INhibernateSession
    {
        private readonly Configuration _configuration;

        public NhibernateSession(string server, string database, string userId, string password)
        {
            var configuration = new Configuration();
            var configurationPath = "nhibernate.cfg.xml";
            configuration.Configure(configurationPath);
            configuration.SetProperty(NHibernate.Cfg.Environment.ConnectionString, $"server={server};database={database};user id={userId};password={password}");
            try
            {
                var messageConfigurationFile = "Mappings/Message.hbm.xml";
                configuration.AddFile(messageConfigurationFile);
                var channelConfigurationFile = "Mappings/Channel.hbm.xml";
                configuration.AddFile(channelConfigurationFile);
                var userConfigurationFile = "Mappings/User.hbm.xml";
                configuration.AddFile(userConfigurationFile);
                _configuration = configuration;

            }
            catch (Exception)
            {
                var messageConfigurationFile = "../Core/Mappings/Message.hbm.xml";
                configuration.AddFile(messageConfigurationFile);
                var channelConfigurationFile = "../Core/Mappings/Channel.hbm.xml";
                configuration.AddFile(channelConfigurationFile);
                var userConfigurationFile = "../Core/Mappings/User.hbm.xml";
                configuration.AddFile(userConfigurationFile);
                _configuration = configuration;

            }
        }
        public ISession OpenSession()
        {   
                ISessionFactory sessionFactory = _configuration.BuildSessionFactory();
                return sessionFactory.OpenSession();
         
        }
    }
}
