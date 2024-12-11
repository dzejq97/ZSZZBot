import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";

module.exports = <ICommand>{
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addUserOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(false)),
    async execute(client, interaction) {
        const targetUser = interaction.options.getUser('user');
        const banReason = interaction.options.getString('reason') || 'no reason';

        if (!targetUser) {
            await interaction.reply({ content: 'User not found', ephemeral: true });
            return;
        }

        if (targetUser.id === interaction.user.id) {
            await interaction.reply({ content: 'You cannot ban yourself', ephemeral: true });
            return;
        }

        if (targetUser.id === client.user?.id) {
            await interaction.reply({ content: 'You cannot ban me', ephemeral: true });
            return;
        }

        try {
            await interaction.guild?.members.ban(targetUser, { reason: banReason });
            await interaction.reply({ content: `Banned ${targetUser} for ${banReason}`});
        } catch (e) {
            await interaction.reply({ content: 'Failed to ban user', ephemeral: true });
        }
    }
}