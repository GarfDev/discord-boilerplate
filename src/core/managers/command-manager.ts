import { Client, Message } from "discord.js";
import { Command, CommandResponse } from "core/types";

/**
 * Manage API methods for Application Commands
 */
export class CommandManager {
  client: Client;
  commands: CommandStorage;

  constructor(client: Client, commandArr: Command[]) {
    const commands: CommandStorage = commandArr.reduce((manager, command) => {
      if (!manager[command.name]) {
        command.alias.forEach((alias) => {
          if (!manager[alias]) {
            manager[alias] = command.execute;
          }
          throw Error(
            `COMMAND NAMED ${command.name} HAVE THE SAME ALIAS WITH OTHER COMMAND`
          );
        });
        throw Error(
          `COMMAND NAMED ${command.name} HAVE THE SAME NAME WITH OTHER COMMAND`
        );
      }
      return manager;
    }, {});

    this.client = client;
    this.commands = commands;
  }

  public execute(alias: string, message: Message): CommandResponse {
    const executor = this.commands[alias];
    if (executor) return executor(message);
  }
}

/**
 * Types
 */

 export interface CommandStorage {
  [alias: string]: Command["execute"];
}
