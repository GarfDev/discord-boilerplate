import { Client, Intents, Interaction } from "discord.js";
import { slashRegister } from "slash";
import { config } from "./configs";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  slashRegister(client.user?.id || '');
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(config.TOKEN);
