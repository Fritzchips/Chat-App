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
        private readonly INhibernateHandler _nhibernateHandler;

        public GeneralHub(INhibernateHandler nhibernateHandler)
        {
            _nhibernateHandler = nhibernateHandler;
        }

        public async Task SendMessageAll(string message, string userName)
        {
            var convertedMsg = JsonConvert.DeserializeObject<Message>(message);
            await Clients.All.SendAsync("ReceiveMessage", convertedMsg, userName);
            _nhibernateHandler.CreateMessage(convertedMsg);
        }

        public async Task JoinRoom(string message, Guid channelId)
        {
            var messageTable = _nhibernateHandler.GetMessages(channelId);
            await Clients.Client(Context.ConnectionId).SendAsync("DataReceived", messageTable);
            await Clients.All.SendAsync("ReceiveGreeting", message);
        }
    }
}
