import { CommandBus } from '@nestjs/cqrs'
import Action, { ActionConstructor } from '@lib/bus/action/action.dto'

export interface CommandProviderInterface {
  dispatch: <P = any>(commandName: string, payload: P, correlationID?: string) => Promise<Action<P>>
}

export type CommandHashmap = Record<string, ActionConstructor>

abstract class CommandProvider implements CommandProviderInterface {
  constructor(
    protected readonly commands: CommandHashmap,
    protected readonly commandBus: CommandBus,
  ) {}

  public async dispatch<P = any>(commandName: string, payload?: P): Promise<Action<P>> {
    const CommandDTO = this.commands[commandName]
    const command = new CommandDTO(payload)

    await this.commandBus.execute(command)

    return command
  }
}

export default CommandProvider
