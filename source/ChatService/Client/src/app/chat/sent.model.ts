import { ClientModel } from "./client.model";

export class SentModel {
    source!: ClientModel;
    target!: ClientModel;
    message!: string;
    private!: boolean;
}
