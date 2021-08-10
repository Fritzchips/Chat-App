using Core;
using System;

namespace Infrastructure
{
    public interface INhibernateHandler
    {
        Channel GetChannel(string name);

        bool ConfirmUser(string name, string password);

        bool CreateUser(User userInfo);

        User GetUserById(Guid userId);

        User GetUserByString(string name, string password);

        User UpdateUser(string type, User userInfo);

        bool CreateMessage(Message message);

        object GetMessages(Guid channelId);   
    }
}
