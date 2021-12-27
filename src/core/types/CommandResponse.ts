import { MessageOptions, MessagePayload } from "discord.js";

export type CommandResponse = void | string | MessagePayload | MessageOptions;
