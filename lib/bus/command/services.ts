import { CommandBus } from '@nestjs/cqrs'

import { CommandDTO } from './dtos'

export interface CommandDispatcherInterface {
  dispatch: <P = any>(commandName: string, payload: P, correlationID?: string) => Promise<void>
}

export type CommandHashmap = Record<string, CommandDTOConstructor>
export type CommandDTOConstructor = new (...arguments_: any[]) => CommandDTO

export abstract class CommandDispatcher implements CommandDispatcherInterface {
  constructor(
    protected readonly commands: CommandHashmap,
    protected readonly commandBus: CommandBus,
  ) {}

  public async dispatch<P = any>(commandName: string, payload: P) {
    const CommandDTO = this.commands[commandName]
    const command = new CommandDTO(payload)

    await this.commandBus.execute(command)
  }
}
