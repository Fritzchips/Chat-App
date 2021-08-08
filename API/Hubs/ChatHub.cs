using API.Hubs.Utilities;
using Core;
using Infrastructure;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly INhibernateHandler _nhibernateHandler;

        public ChatHub(INhibernateHandler nhibernateHandler)
        {
            _nhibernateHandler = nhibernateHandler;
        }

        public async Task SendMessageRoom(string message, string userName, string channelName)
        {
            var convertedMsg = JsonConvert.DeserializeObject<Message>(message);
            await Clients.Group(channelName).SendAsync("ReceiveMessage", convertedMsg, userName);
            _nhibernateHandler.CreateMessage(convertedMsg);
        }

        public async Task JoinChat(string userName, Guid userId)
        {
            HubUser user = new HubUser
            {
                Name = userName,
                Id = Context.ConnectionId,
                UserId = userId
            };
            try
            {
                var copy = UserHandler.userList.Single(x => x.UserId == userId);
            }
            catch (Exception)
            {
                UserHandler.userList.Add(user);
            };
        
            await Clients.All.SendAsync("UsersReceived", UserHandler.userList);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var user = UserHandler.userList.Single(x => x.Id == Context.ConnectionId);
            UserHandler.userList.Remove(user);
            await Clients.All.SendAsync("UsersReceived", UserHandler.userList);
            await Task.CompletedTask;
        }

        public async Task JoinRoom(string channelName,Guid channelId)
        {
            var messageTable =  _nhibernateHandler.GetMessages(channelId);
            await Groups.AddToGroupAsync(Context.ConnectionId, channelName);
            await Clients.Client(Context.ConnectionId).SendAsync("DataReceived", messageTable);
        }

        public async Task LeaveRoom(string channelName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, channelName);
        }
    }
}
