import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AppChatService } from "./chat.service";
import { Client } from "./client.model";
import { Sent } from "./sent.model";

@Component({ selector: "app-chat", templateUrl: "./chat.component.html" })
export class AppChatComponent {
    clients = new Array<Client>();
    form = this.formBuilder.group({ connectionId: "", message: "", private: false });
    name = Math.random().toString(36).substring(2);

    constructor(private readonly formBuilder: FormBuilder, private readonly appChatService: AppChatService) {
        this.appChatService.start(this.name);
        this.appChatService.$connected.subscribe((client: Client) => this.connected(client));
        this.appChatService.$disconnected.subscribe((client: Client) => this.disconnected(client));
        this.appChatService.$listed.subscribe((clients: Client[]) => this.listed(clients));
        this.appChatService.$sent.subscribe((sent: Sent) => this.sent(sent));
    }

    send() {
        this.appChatService.send(this.form.value).then(() => this.form.controls.message.reset());
    }

    private addMessage(message: string, css: string) {
        const messages = (document.getElementById("messages") as HTMLElement);
        messages.innerHTML += `<li class="${css}">${message}</li>`;
        messages.scrollTop = messages.scrollHeight;
    }

    private connected(client: Client) {
        this.clients.push(client);
        this.addMessage(`${this.htmlForName(client.name)} connected.`, "alert-success");
    }

    private disconnected(client: Client) {
        this.clients = this.clients.filter(item => item.connectionId !== client.connectionId);
        this.addMessage(`${this.htmlForName(client.name)} disconnected.`, "alert-danger");
    }

    private htmlForName(name: string) {
        return `<span class="name">${name}</span>`;
    }

    private listed(clients: Client[]) {
        this.clients = clients;
    }

    private sent(sent: Sent) {
        if (!sent.target) {
            this.addMessage(`${this.htmlForName(sent.source.name)}: ${sent.message}`, "alert-default");
            return;
        }

        const message = `${this.htmlForName(sent.source.name)} to ${this.htmlForName(sent.target.name)}: ${sent.message}`;

        if (sent.target.name !== this.name) {
            this.addMessage(`${message}`, "alert-default");
            return;
        }

        this.addMessage(`${message}`, "alert-primary");
    }
}
