import { slashRegister } from "slash";
import { Client, Intents, Interaction } from "discord.js";
import { CommandManager } from "core/managers";
import { commands } from "./slash";
import { config } from "./configs";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commandManager = new CommandManager(client, commands);

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  slashRegister(client.user?.id || "");
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const response = await commandManager.execute(
    interaction.commandName,
    interaction
  );

  if (response) {
    await interaction.reply({ content: response as string });
  }
});

client.login(config.TOKEN);
