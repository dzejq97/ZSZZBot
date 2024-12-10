import { ChatInputCommandInteraction, Interaction } from "discord.js";
import CClient from "../classes/CClient";

export default async function(client: CClient, interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(client, interaction);
    } catch (e) {
        console.error(e);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Wystąpił błąd podczas wykonywania komendy.', ephemeral: true})
        } else {
            await interaction.reply({ content: 'Wystąpił błąd podczas wykonywania komendy.', ephemeral: true})
        }
    }
}