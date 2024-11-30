namespace ChatService;

public sealed class ChatRepository : IChatRepository
{
    private readonly IList<Client> _clients = new List<Client>();

    public void Add(Client client)
    {
        if (!_clients.Contains(client)) _clients.Add(client);
    }

    public Client Get(string connectionId) => _clients.SingleOrDefault(client => client.ConnectionId == connectionId);

    public IEnumerable<Client> Get() => _clients.OrderBy(client => client.Name);

    public IEnumerable<Client> GetExcept(string connectionId) => Get().Where(client => client.ConnectionId != connectionId);

    public Client Remove(string connectionId)
    {
        var client = Get(connectionId);

        _clients.Remove(client);

        return client;
    }
}
