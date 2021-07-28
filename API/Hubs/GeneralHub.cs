using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Hubs
{
    public class GeneralHub : Hub
    {
        public Task SendMessageAll(string message)
        {
            return Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
