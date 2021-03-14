using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ChatService
{
    public class Startup
    {
        public void Configure(IApplicationBuilder application, IHostEnvironment environment)
        {
            application.UseHsts();
            application.UseHttpsRedirection();
            application.UseRouting();
            application.UseEndpoints(endpoints => endpoints.MapHub<ChatHub>(nameof(ChatHub).ToLower()));
            application.UseStaticFiles();
            application.UseSpaStaticFiles();

            application.UseSpa(builder =>
            {
                builder.Options.SourcePath = "Client";

                if (environment.IsDevelopment())
                {
                    builder.UseAngularCliServer("start");
                }
            });
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCompression();
            services.AddControllers();
            services.AddSignalR();
            services.AddSpaStaticFiles(options => options.RootPath = "Client/dist");
            services.AddSingleton<IChatService, ChatService>();
        }
    }
}
