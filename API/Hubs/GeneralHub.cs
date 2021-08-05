using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Core;
using NHibernate;
using Infrastructure;
using System.Collections;
using Microsoft.AspNetCore.Authorization;

namespace API.Hubs
{
    public class GeneralHub : Hub
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
                                select new { msg.Id, msg.Context, msg.Date , user.Name };
                    var messageTable = query.ToList();
                    transaction.Commit();
                    await Clients.Client(Context.ConnectionId).SendAsync("DataReceived", messageTable);
                }
            }
            
            await Clients.All.SendAsync("ReceiveGreeting", message);
        }

    }
}
