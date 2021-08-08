using Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public interface INhibernateHandler
    {
        bool FindUser(string name, string password);

        void CreateUser(User userInfo);

        User GetUserById(Guid userId);

        User GetUserByString(string name, string password);

        void UpdateUser(string type, User userInfo);

        Channel GetChannel(string name);

        void CreateMessage(Message message);

        object GetMessages(Guid channelId);

       

       
    }
}
