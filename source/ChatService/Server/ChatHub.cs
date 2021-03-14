using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace ChatService
{
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;

        public ChatHub(IChatService chatService)
        {
            _chatService = chatService;
        }

        public override async Task OnConnectedAsync()
        {
            Context.GetHttpContext().Request.Query.TryGetValue("name", out var name);

            var client = new Client(Context.ConnectionId, name);

            _chatService.Add(client);

            await Clients.All.SendAsync("Connected", client);

            var clients = _chatService.GetExcept(Context.ConnectionId);

            await Clients.Client(Context.ConnectionId).SendAsync("Listed", clients);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var client = _chatService.Get(Context.ConnectionId);

            _chatService.Remove(Context.ConnectionId);

            await Clients.All.SendAsync("Disconnected", client);

            await base.OnDisconnectedAsync(exception);
        }

        public async Task Send(Send send)
        {
            if (string.IsNullOrWhiteSpace(send.Message)) { return; }

            var source = _chatService.Get(Context.ConnectionId);

            var sent = new Sent(source, send.Message, send.Private);

            if (!string.IsNullOrWhiteSpace(send.ConnectionId))
            {
                sent.Target = _chatService.Get(send.ConnectionId);
            }

            var clients = send.All ? Clients.All : Clients.Clients(Context.ConnectionId, send.ConnectionId);

            await clients.SendAsync("Sent", sent);
        }
    }
}
