import { Client, Interaction, Message } from "discord.js";
import { Command, CommandResponse } from "core/types";

/**
 * Manage API methods for Application Commands
 */
export class CommandManager {
  client: Client;
  commands: CommandStorage;

  constructor(client: Client, commandArr: Command[]) {
    const commands: CommandStorage = commandArr.reduce((manager, command) => {
      command.alias.forEach((alias) => {
        if (manager[alias]) {
          throw Error(
            `COMMAND NAMED ${command.name} HAVE THE SAME ALIAS WITH OTHER COMMAND`
          );
        }

        manager[alias] = command.execute;
      });

      return manager;
    }, {});

    this.client = client;
    this.commands = commands;
  }

  public async execute(
    alias: string,
    message: Message | Interaction
  ): Promise<CommandResponse> {
    const executor = this.commands[alias];
    if (executor) {
      const response = await executor(message);
      return response;
    }
  }
}

/**
 * Types
 */

export interface CommandStorage {
  [alias: string]: Command["execute"];
}
