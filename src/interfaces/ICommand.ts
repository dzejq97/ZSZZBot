import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import CClient from "../classes/CClient";

export default interface ICommand {
    devOnly?: boolean,
    data: SlashCommandBuilder,
    execute(client: CClient, interaction: ChatInputCommandInteraction): void
}