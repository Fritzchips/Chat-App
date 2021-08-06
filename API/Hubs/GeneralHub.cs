using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Core;
using Infrastructure;

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

        public async Task JoinRoom(string userName, Guid channelId)
        {
            HubUser user = new HubUser
            {
                Name = userName,
                Id = Context.ConnectionId
            };

            UserHandler.userList.Add(user);
            var messageTable = _nhibernateHandler.GetMessages(channelId);
            await Clients.Client(Context.ConnectionId).SendAsync("DataReceived", messageTable);
            await Clients.All.SendAsync("UsersReceived", UserHandler.userList);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var user = UserHandler.userList.Single(x => x.Id == Context.ConnectionId);
            UserHandler.userList.Remove(user);
            await Clients.All.SendAsync("UsersReceived", UserHandler.userList);
            await Task.CompletedTask;
        }
    }
}
