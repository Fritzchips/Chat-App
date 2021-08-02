using Core;
using Infrastructure;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Hubs
{
    public class CodingHub : Hub
    {
        public async Task SendMessageAll(string message)
        {
            var convertedMsg = JsonConvert.DeserializeObject<Message>(message);

            await Clients.All.SendAsync("ReceiveMessage", convertedMsg);
            //post messages to database
            using (ISession session = MessageSession.OpenSession())
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

            List<Message> messageTable = new List<Message>();

            using (ISession session = MessageSession.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {

                    var dataCopy = session.Query<Message>()
                        .OrderBy(x => x.Date)
                        .Where(x => x.ChannelId == channelId)
                        .ToList();
                    messageTable = dataCopy;
                    transaction.Commit();
                }
            }
            await Clients.Client(Context.ConnectionId).SendAsync("DataReceived", messageTable);
            await Clients.All.SendAsync("ReceiveGreeting", message);
        }
    }
}
