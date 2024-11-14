var builder = WebApplication.CreateBuilder();
builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:4200")));
builder.Services.AddSignalR();
builder.Services.AddSingleton<IChatRepository, ChatRepository>();

var application = builder.Build();
application.UseCors();
application.MapHub<ChatHub>("chathub");
application.UseStaticFiles();
application.MapFallbackToFile("index.html");
application.Run();
