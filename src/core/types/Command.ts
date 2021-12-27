import { Message } from "discord.js";
import { CommandResponse } from "./CommandResponse";

export interface Command {
  name: string;
  description: string;
  alias: string[];
  execute: (message: Message) => CommandResponse;
}