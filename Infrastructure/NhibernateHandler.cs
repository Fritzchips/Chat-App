using Core;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class NhibernateHandler : INhibernateHandler
    {
        public NhibernateHandler()
        {
        }

        public void CreateMessage(Message message)
        {
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    session.Save(message);
                    transaction.Commit();
                }
            }
        }

        public string CreateUser(string name, string password)
        {
            User person = new User()
            {
                Name = name,
                Password = password
            };
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    var checkPerson = session.Query<User>().Where(x => x.Name == name && x.Password == password).ToList();
                    if (checkPerson.Count < 1)
                    {
                        session.Save(person);
                        transaction.Commit();
                        return "created user";
                    }
                    else
                    {
                        transaction.Commit();
                        return "user already exist";    
                    }
                }
            }
        }

        public Channel GetChannel(string name)
        {
            Channel channelData;
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    var channel = session.Query<Channel>().Where(x => x.Name == name).FirstOrDefault();

                    transaction.Commit();
                    channelData = channel;
                }
            }
            return channelData;
        }

        public object GetMessages(Guid channelId)
        {
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    var query = from msg in session.Query<Message>()
                                join user in session.Query<User>() on msg.UserId equals user.Id
                                orderby msg.Date
                                where msg.ChannelId == channelId
                                select new { msg.Id, msg.Context, msg.Date, user.Name };
                    var messageTable = query.ToList();
                    transaction.Commit();
                    return messageTable;
                }
            }
        }

        public User GetUser(string name, string password)
        {
            User client;
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    var checkUser = session.Query<User>().Where(x => x.Name == name && x.Password == password).FirstOrDefault();
                    if (checkUser != null)
                    {
                        client = checkUser;
                        transaction.Commit();
                    }
                    else
                    {
                        transaction.Commit();
                        client = null;
                    }
                }
            }
            return client;
        }
    }
}
