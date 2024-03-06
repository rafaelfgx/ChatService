namespace ChatService;

public interface IChatRepository
{
    void Add(Client client);

    Client Get(string connectionId);

    IEnumerable<Client> Get();

    IEnumerable<Client> GetExcept(string connectionId);

    Client Remove(string connectionId);
}
