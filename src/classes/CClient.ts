import  { Client, ClientOptions, ClientEvents } from "discord.js";

import on_ready from "../events/on_ready";

export default class CClient extends Client {
    constructor(options: ClientOptions) {
        super(options);
    }

    setupEventsHandler() {
        this.on('ready', on_ready);
    }
}