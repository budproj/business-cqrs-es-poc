import Action, { ActionInterface, ActionProperties } from '@lib/cqrs/bus/action/action'
import ActionTracing from '@lib/cqrs/bus/action/tracing'

import CommandMetadata from './metadata'

interface CommandInterface<P> extends ActionInterface<P> {
  metadata: CommandMetadata
}

abstract class Command<P = any> extends Action<P> implements CommandInterface<P> {
  public readonly metadata: CommandMetadata
  public readonly tracing!: ActionTracing
  public readonly payload?: P

  constructor({ name, ...rest }: ActionProperties<P>) {
    super({ name, ...rest })
    this.metadata = new CommandMetadata({ name })
  }
}

export default Command
