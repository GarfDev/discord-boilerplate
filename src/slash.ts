import fs from "fs";
import { REST } from "@discordjs/rest";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Routes } from "discord-api-types/v9";
import { Command } from "core/types";
import { staticPath } from "core/utils";
import { config } from "configs";

const commandPath = staticPath("commands");
const commandFiles = fs.readdirSync(commandPath);

export const commands: Command[] = commandFiles.map((filename) => {
  const file = require(staticPath(`commands/${filename}`)).default;
  return file;
});

const slashCommands = commands.map((file) => {
  const data = new SlashCommandBuilder()
    .setName(file.name)
    .setDescription(file.description)
    .toJSON();
  return data;
});

export const slashRegister = async (clientId: string) => {
  const rest = new REST({ version: "9" }).setToken(config.TOKEN || "");

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(clientId || ""), {
      body: slashCommands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
