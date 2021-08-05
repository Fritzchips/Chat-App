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
        User GetUser(string name, string password);

        string CreateUser(string name, string password);

        Channel GetChannel(string name);

        void CreateMessage(Message message);

        object GetMessages(Guid channelId);
    }
}
