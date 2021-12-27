import fs from "fs";
import { REST } from "@discordjs/rest";
import { SlashCommandBuilder } from '@discordjs/builders';
import { Routes } from "discord-api-types/v9";
import { staticPath } from "core/utils";
import { config } from "configs";

const commandPath = staticPath("commands");
const commandFiles = fs.readdirSync(commandPath);

const commands = commandFiles.map((filename) => {
  const file = require(staticPath(`commands/${filename}`)).default;

  const data = new SlashCommandBuilder().
  setName(file.name)
  .setDescription(file.description)
  .toJSON();
  return data;

});

export const slashRegister = async (clientId: string) => {
  const rest = new REST({ version: "9" }).setToken(config.TOKEN || "");

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(clientId || ""), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
