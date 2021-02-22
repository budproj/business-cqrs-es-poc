import { Logger } from '@nestjs/common'
import { AggregateRoot, IEvent } from '@nestjs/cqrs'

import { CommandDTO } from 'lib/bus/command/dtos'
import { EventProvider } from 'lib/bus/event/services'

interface ModelAggregateRootInterface {
  setCommand: (command: CommandDTO) => void
  apply: (event: IEvent) => void
}

export type ModelAggregateRootConstructor = new (...arguments_: any[]) => ModelAggregateRoot

export abstract class ModelAggregateRoot
  extends AggregateRoot
  implements ModelAggregateRootInterface {
  protected readonly eventProvider: EventProvider
  protected readonly logger: Logger
  protected command: CommandDTO

  public apply(event: IEvent) {
    this.logger.log({
      event,
      message: 'Dispatching event',
    })

    super.apply(event)
  }

  public setCommand(command: CommandDTO) {
    this.command = command
  }
}
