using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Core;
using NHibernate;
using Infrastructure;

namespace API.Hubs
{
    public class GeneralHub : Hub
    {
        //make property of List<User>
        //return that user list to people who join room with table list
        //on disconnect remove that user from active list
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

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception); 
        }

    }
}
