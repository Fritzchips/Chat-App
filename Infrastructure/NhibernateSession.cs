using NHibernate;
using NHibernate.Cfg;

namespace Infrastructure
{
    public class NhibernateSession
    {
        public static ISession OpenSession()
        {
            var configuration = new Configuration();
            var configurationPath = "Mappings/hibernate.cfg.xml";
            configuration.Configure(configurationPath);
            var messageConfigurationFile = "Mappings/Message.hbm.xml";
            configuration.AddFile(messageConfigurationFile);
            var channelConfigurationFile = "Mappings/Channel.hbm.xml";
            configuration.AddFile(channelConfigurationFile);
            var userConfigurationFile = "Mappings/User.hbm.xml";
            configuration.AddFile(userConfigurationFile);
            ISessionFactory sessionFactory = configuration.BuildSessionFactory();
            return sessionFactory.OpenSession();
        }
    }
}
