var builder = WebApplication.CreateBuilder();

builder.Services.AddSignalR();

builder.Services.AddSingleton<IChatRepository, ChatRepository>();

var application = builder.Build();

application.MapHub<ChatHub>("chathub");

application.UseStaticFiles();

application.MapFallbackToFile("index.html");

application.Run();
