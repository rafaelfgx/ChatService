using System.Collections.Generic;
using System.Linq;

namespace ChatService
{
    public sealed class ChatService : IChatService
    {
        private readonly IList<Client> _clients = new List<Client>();

        public void Add(Client client)
        {
            if (_clients.Contains(client)) { return; }

            _clients.Add(client);
        }

        public Client Get(string connectionId)
        {
            return _clients.SingleOrDefault(client => client.ConnectionId == connectionId);
        }

        public IEnumerable<Client> Get()
        {
            return _clients.OrderBy(x => x.Name);
        }

        public IEnumerable<Client> GetExcept(string connectionId)
        {
            return Get().Where(client => client.ConnectionId != connectionId).OrderBy(x => x.Name);
        }

        public void Remove(string connectionId)
        {
            _clients.Remove(new Client(connectionId));
        }
    }
}
