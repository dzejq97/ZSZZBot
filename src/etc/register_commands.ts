import { Collection, REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
import ICommand from "../interfaces/ICommand";

export default async function(commands: Collection<string, ICommand>) {
    const commandsJSON: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
    const devOnlyCommandsJSON: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

    commands.forEach(async (command) => {
        if (command.devOnly) devOnlyCommandsJSON.push(command.data.toJSON());
        else commandsJSON.push(command.data.toJSON());
    })

    const rest = new REST().setToken(process.env.TOKEN!);

    try {
        console.log('Publishing commands')
        console.log(`${commandsJSON.length} global commands`);
        console.log(`${devOnlyCommandsJSON.length} dev only commands`);
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID!),
            { body: commandsJSON }
        )
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.DEV_GUILD_ID!),
            { body: devOnlyCommandsJSON}
        )
    } catch(e) {
        console.log(e);
    }
}