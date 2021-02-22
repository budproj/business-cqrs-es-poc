import { CommandBus } from '@nestjs/cqrs'

import { ActionService } from 'lib/bus/action/services'

import { CommandDTO } from './dtos'

export interface CommandDispatcherInterface {
  dispatch: <P = any>(commandName: string, payload: P, correlationID?: string) => Promise<void>
}

export type CommandHashmap = Record<string, CommandDTOConstructor>
export type CommandDTOConstructor = new (...arguments_: any[]) => CommandDTO

export abstract class CommandDispatcher
  extends ActionService
  implements CommandDispatcherInterface {
  constructor(
    protected readonly commands: CommandHashmap,
    protected readonly commandBus: CommandBus,
  ) {
    super()
  }

  public async dispatch<P = any>(commandName: string, payload: P) {
    const CommandDTO = this.commands[commandName]
    const tracing = this.buildTrace()
    const command = new CommandDTO(payload)

    command.setTracing(tracing)

    await this.commandBus.execute(command)
  }
}
