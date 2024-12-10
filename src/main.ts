import dotenv from 'dotenv';
import CClient from './classes/CClient';
import { GatewayIntentBits } from 'discord.js';
dotenv.config();

const client = new CClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences
    ]
})

const main = async () => {
    //client.login(process.env.TOKEN);
    client.setupEventsHandler();
}
main();