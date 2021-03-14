using System.Collections.Generic;

namespace ChatService
{
    public interface IChatService
    {
        void Add(Client client);

        Client Get(string connectionId);

        IEnumerable<Client> Get();

        IEnumerable<Client> GetExcept(string connectionId);

        void Remove(string connectionId);
    }
}
