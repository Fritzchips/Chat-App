using Core;
using System;

namespace Infrastructure
{
    public interface INhibernateHandler
    {
        Channel GetChannel(string name);

        bool ConfirmUser(string name, string password);

        void CreateUser(User userInfo);

        User GetUserById(Guid userId);

        User GetUserByString(string name, string password);

        void UpdateUser(string type, User userInfo);

        void CreateMessage(Message message);

        object GetMessages(Guid channelId);   
    }
}
