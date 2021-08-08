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

        public void CreateUser(User userInfo)
        {
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                        session.Save(userInfo);
                        transaction.Commit();
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

        public bool FindUser(string name, string password)
        {
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    var checkUser = session.Query<User>().Where(x => x.Name == name && x.Password == password).FirstOrDefault();
                    if (checkUser != null)
                    {
                        transaction.Commit();
                        return true;
                    }
                    else
                    {
                        transaction.Commit();
                        return false;
                    }
                }
            }
        }

        public User GetUserById(Guid userId)
        {
            User client;
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    User user = session.Get<User>(userId);
                    client = user;
                    transaction.Commit();
                }
            }
            return client;
        }
        
        public User GetUserByString(string name, string password)
        {
            User client;
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    User user = session.Query<User>().Where(x => x.Name == name && x.Password == password).FirstOrDefault();
                    client = user;
                    transaction.Commit();
                }
            }
            return client;
        }



        public void UpdateUser(string type, User userInfo)
        {
            using(ISession session = NhibernateSession.OpenSession())
            {
                using(ITransaction transaction = session.BeginTransaction())
                {
                    User updateUser = session.Get<User>(userInfo.Id);
                    if (type == "Name")
                    {
                        updateUser.Name = userInfo.Name;

                    } else if(type == "Password")
                    {
                        updateUser.Password = userInfo.Password;
                    }
                    else
                    {
                        updateUser.Name = userInfo.Name;
                        updateUser.Password = userInfo.Password;
                    };
                    transaction.Commit();

                }
            }  
        }
    }
}
