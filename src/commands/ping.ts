import { Command } from "core/types/Command";

const ping: Command = {
  name: "ping",
  alias: ["ping", "p"],
  description: "return pong when call",
  execute: async (message) => {
    return 'Pong!'
  },
};

export default ping;
