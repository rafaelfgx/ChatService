import { Client } from "./client.model";

export class Sent {
    message!: string;
    private!: boolean;
    source!: Client;
    target!: Client;
}
