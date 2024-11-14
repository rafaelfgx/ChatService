namespace ChatService;

public class ChatHub(IChatRepository chatRepository) : Hub
{
    public override async Task OnConnectedAsync()
    {
        Context.GetHttpContext().Request.Query.TryGetValue("name", out var name);

        var client = new Client(Context.ConnectionId, name);

        chatRepository.Add(client);

        await Clients.All.SendAsync("Connected", new Connected(client));

        var clients = chatRepository.GetExcept(Context.ConnectionId);

        await Clients.Client(Context.ConnectionId).SendAsync("Loaded", new Loaded(clients));

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var client = chatRepository.Remove(Context.ConnectionId);

        await Clients.All.SendAsync("Disconnected", new Disconnected(client));

        await base.OnDisconnectedAsync(exception);
    }

    public async Task Send(Send send)
    {
        if (string.IsNullOrWhiteSpace(send.Message)) return;

        var clients = send.All ? Clients.All : Clients.Clients(Context.ConnectionId, send.ConnectionId);

        var source = chatRepository.Get(Context.ConnectionId);

        var target = chatRepository.Get(send.ConnectionId);

        await clients.SendAsync("Sent", new Sent(source, target, send.Message, send.Private));
    }
}
