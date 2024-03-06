import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ConnectedModel } from "./connected.model";
import { DisconnectedModel } from "./disconnected.model";
import { LoadedModel } from "./loaded.model";
import { SendModel } from "./send.model";
import { SentModel } from "./sent.model";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

@Injectable({ providedIn: "root" })
export class AppChatService {
    $connected = new Subject<ConnectedModel>();
    $disconnected = new Subject<DisconnectedModel>();
    $loaded = new Subject<LoadedModel>();
    $sent = new Subject<SentModel>();

    private connection!: HubConnection;

    start(name: string) {
        this.connection = new HubConnectionBuilder().withUrl(`chathub?name=${name}`).withAutomaticReconnect().build();
        this.connection.on("Connected", (connected: ConnectedModel) => this.$connected.next(connected));
        this.connection.on("Disconnected", (disconnected: DisconnectedModel) => this.$disconnected.next(disconnected));
        this.connection.on("Loaded", (loaded: LoadedModel) => this.$loaded.next(loaded));
        this.connection.on("Sent", (sent: SentModel) => this.$sent.next(sent));
        this.connection.start();
    }

    send = (send: SendModel) => this.connection.invoke("Send", send);
}
