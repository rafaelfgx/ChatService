import { CommonModule } from "@angular/common";
import { Component, inject, OnDestroy } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppChatService } from "./chat.service";
import { ClientModel } from "./client.model";
import { ConnectedModel } from "./connected.model";
import { DisconnectedModel } from "./disconnected.model";
import { LoadedModel } from "./loaded.model";
import { SendModel } from "./send.model";
import { SentModel } from "./sent.model";

@Component({
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppChatComponent implements OnDestroy {
    form = inject(FormBuilder).group({ connectionId: undefined, message: undefined, private: false });
    clients = new Array<ClientModel>();
    name = Math.random().toString(36).substring(2);

    constructor(private readonly appChatService: AppChatService) {
        this.appChatService.start(this.name);
        this.appChatService.$connected?.subscribe((connected) => this.connected(connected));
        this.appChatService.$disconnected?.subscribe((disconnected) => this.disconnected(disconnected));
        this.appChatService.$loaded?.subscribe((loaded) => this.loaded(loaded));
        this.appChatService.$sent?.subscribe((sent) => this.sent(sent));
    }

    ngOnDestroy(): void {
        this.appChatService.$connected?.unsubscribe();
        this.appChatService.$disconnected?.unsubscribe();
        this.appChatService.$loaded?.unsubscribe();
        this.appChatService.$sent?.unsubscribe();
    }

    send = () => this.appChatService.send(this.form.value as SendModel).then(() => this.form.controls.message.reset());

    private message(message: string, css: string) {
        const messages = document.getElementById("messages") as HTMLElement;
        messages.innerHTML += `<li class="${css}">${message}</li>`;
        messages.scrollTop = messages.scrollHeight;
    }

    private htmlName = (name: string) => `<span class="name">${name}</span>`;

    private connected(connected: ConnectedModel) {
        this.clients.push(connected.client);
        this.message(`${this.htmlName(connected.client.name)} connected.`, "alert-success");
    }

    private disconnected(disconnected: DisconnectedModel) {
        this.clients = this.clients.filter(client => client.connectionId !== disconnected.client.connectionId);
        this.message(`${this.htmlName(disconnected.client.name)} disconnected.`, "alert-danger");
    }

    private loaded = (loaded: LoadedModel) => this.clients = loaded.clients;

    private sent(sent: SentModel) {
        const targetName = sent.target ? `to ${this.htmlName(sent.target.name)}` : "";
        const css = sent.target?.name === this.name ? "alert-primary" : "alert-default";
        const message = `${this.htmlName(sent.source.name)} ${targetName}: ${sent.message}`;
        this.message(message, css);
    }
}
