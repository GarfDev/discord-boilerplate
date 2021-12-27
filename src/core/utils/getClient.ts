import { Client } from "discord.js";

export const getClient = (): Client => {
  return global.client as Client;
}