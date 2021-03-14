import { Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Subject } from "rxjs";
import { Client } from "./client.model";
import { Send } from "./send.model";
import { Sent } from "./sent.model";

@Injectable({ providedIn: "root" })
export class AppChatService {
    $connected = new Subject<Client>();
    $disconnected = new Subject<Client>();
    $listed = new Subject<Client[]>();
    $sent = new Subject<Sent>();

    private connection!: HubConnection;

    connect() {
        this.connection.start().catch(() => setTimeout(() => this.connect(), 5000));
    }

    send(send: Send) {
        return this.connection.invoke("Send", send);
    }

    start(name: string) {
        this.connection = new HubConnectionBuilder().withUrl(`chathub?name=${name}`).build();
        this.connection.on("Connected", (client: Client) => this.$connected.next(client));
        this.connection.on("Disconnected", (client: Client) => this.$disconnected.next(client));
        this.connection.on("Listed", (clients: Client[]) => this.$listed.next(clients));
        this.connection.on("Sent", (sent: Sent) => this.$sent.next(sent));
        this.connect();
    }
}
