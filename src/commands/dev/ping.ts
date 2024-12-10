import { SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";

module.exports = <ICommand>{
    devOnly: true,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(client, interaction) {
        await interaction.reply({content: 'Pong!', ephemeral: true})
    },
}