namespace ChatService
{
    public class Sent
    {
        public Sent
        (
            Client source,
            string message,
            bool @private
        )
        {
            Source = source;
            Message = message;
            Private = @private;
        }

        public string Message { get; set; }

        public bool Private { get; set; }

        public Client Source { get; set; }

        public Client Target { get; set; }
    }
}
