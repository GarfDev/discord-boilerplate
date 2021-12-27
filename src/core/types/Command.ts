import { Message } from "discord.js";

export interface Command {
  name: string;
  description: string;
  alias: string[];
  execute: (message: Message) => void;
}