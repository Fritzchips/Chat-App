using Core;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Hubs
{
    public class RandomHub : Hub
    {
        public async Task SendMessageAll(string message)
        {
            var convertedMsg = JsonConvert.DeserializeObject<Message>(message);

            await Clients.All.SendAsync("ReceiveMessage", convertedMsg);
            using (ISession session = NhibernateSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    session.Save(convertedMsg);
                    transaction.Commit();

                }
            }
        }

        public async Task JoinRoom(string message, Guid channelId)
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
                    await Clients.Client(Context.ConnectionId).SendAsync("DataReceived", messageTable);
                }
            }
            
            await Clients.All.SendAsync("ReceiveGreeting", message);
        }

    }
}
