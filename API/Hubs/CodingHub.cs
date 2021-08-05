using Core;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
    public class CodingHub : Hub
    {
        private readonly INhibernateHandler _nhibernateHandler;

        public CodingHub(INhibernateHandler nhibernateHandler)
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
