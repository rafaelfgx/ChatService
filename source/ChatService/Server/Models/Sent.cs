namespace ChatService;

public sealed record Sent(Client Source, Client Target, string Message, bool Private);
