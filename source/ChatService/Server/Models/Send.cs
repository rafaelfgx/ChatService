namespace ChatService;

public sealed record Send
{
    public bool All => string.IsNullOrWhiteSpace(ConnectionId) || !Private;

    public string ConnectionId { get; set; }

    public string Message { get; set; }

    public bool Private { get; set; }
}
