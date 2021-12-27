import { Command } from "core/types/Command";

const ping: Command = {
  name: "ping",
  alias: ['ping', 'p'],
  description: "return pong when call",
  execute: (message) => {
    message.channel.send("Pong");
  },
};

export default ping;
