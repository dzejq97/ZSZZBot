import { EmbedBuilder, GuildMember } from "discord.js";
import CClient from "../classes/CClient";

export default async function(client: CClient, member: GuildMember) {
    if (member.user.bot) return;

    const emb = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Witamy na serwerze!')
        .setDescription(`Witamy ${member} na serwerze!`)
    if (member.guild.id === client.config.main_guild.id && !client.config.dev_mode) {
        const ch = member.guild.channels.cache.get(client.config.main_guild.channels_ids.member_join);
        if (ch && ch?.isTextBased()) {
            await ch.send({embeds: [emb]})
        } else return;
    } else if (member.guild.id === client.config.development_guild.id) {
        const ch = member.guild.channels.cache.get(client.config.development_guild.channels_ids.member_join);
        if (ch && ch?.isTextBased()) {
            await ch.send({embeds: [emb]})
        } else return;
    }
}