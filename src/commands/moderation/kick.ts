import { PermissionFlagsBits, PermissionsBitField, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";

module.exports = <ICommand>{
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server')
        .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the kick').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
        async execute(client, interaction) {
            const targetUser = interaction.options.getUser('user');
            const kickReason = interaction.options.getString('reason') || 'no reason';

            if (!targetUser) {
                await interaction.reply({ content: 'User not found', ephemeral: true });
                return;
            }

            if (targetUser.id === interaction.user.id) {
                await interaction.reply({ content: 'You cannot kick yourself', ephemeral: true });
                return;
            }

            if (targetUser.id === client.user?.id) {
                await interaction.reply({ content: 'You cannot kick me', ephemeral: true });
                return;
            }

            await interaction.guild?.members.kick(targetUser, kickReason);
            await interaction.reply({ content: `Kicked ${targetUser} for ${kickReason}`});
        }
    
}