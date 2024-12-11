import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";

module.exports = <ICommand>{
    data: new SlashCommandBuilder()
        .setName('ann')
        .setDescription('Announcement')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addStringOption(option => option.setName('message').setDescription('The message').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('The channel')),
    async execute(client, interaction) {
        const channel_id = interaction.options.getChannel('channel')?.id || interaction.channel?.id;
        if (!channel_id) return;
        const channel = interaction.guild?.channels.cache.get(channel_id);
        if (!channel?.isTextBased()) {
            await interaction.reply({ content: 'Channel is not a text channel', ephemeral: true });
            return;
        }
        const message = interaction.options.getString('message');

        if (!channel) {
            await interaction.reply({ content: 'Channel not found', ephemeral: true });
            return;
        }

        if (!message) {
            await interaction.reply({ content: 'Message not found', ephemeral: true });
            return;
        }

        try {
            await channel.send(`Ogłoszenie administracji:\n# ${message}`);
            await interaction.reply({ content: 'Message sent', ephemeral: true });
        } catch(e) {
            await interaction.reply({ content: 'Failed to send message', ephemeral: true });
        }
    },
}