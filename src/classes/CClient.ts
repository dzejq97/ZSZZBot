import  { Client, ClientOptions, Collection } from "discord.js";
import fs from 'node:fs'
import path from "node:path";

import on_ready from "../events/on_ready";
import ICommand from "../interfaces/ICommand";
import on_interaction_create from "../events/on_interaction_create";
import register_commands from "../etc/register_commands";
import on_guild_member_add from "../events/on_guild_member_add";
import config from "../config.json";

export default class CClient extends Client {
    commands = new Collection<string, ICommand>();
    config = config;

    constructor(options: ClientOptions) {
        super(options);
    }

    setupEventsHandler() {
        this.on('ready', async () => await on_ready(this));
        this.on('interactionCreate', async (interaction) => await on_interaction_create(this, interaction));
        this.on('guildMemberAdd', async (member) => await on_guild_member_add(this, member));
        console.log('Events ready');
    }

    async setupSlashCommands() {
        console.log('Cache loading commands')
        const commandsFolderPath = path.join(__dirname, '../commands');
        const commandsFolders = fs.readdirSync(commandsFolderPath);

        for (const folder of commandsFolders) {
            const commandsPath = path.join(commandsFolderPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command: ICommand = require(filePath) as ICommand;
                this.commands.set(command.data.name, command);
                console.log(`✅ ${command.data.name} ${command.devOnly ? '(dev only)' : ''}`);
            }
        }

        if (this.config.reload_commands) {
            await register_commands(this.commands);
        }
        console.log('commands ready')
    }
}