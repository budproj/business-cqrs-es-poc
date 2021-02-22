import { Logger } from '@nestjs/common'
import { AggregateRoot } from '@nestjs/cqrs'

import { CommandDTO } from 'lib/bus/command/dtos'
import { EventDTO } from 'lib/bus/event/dtos'
import { EventProvider } from 'lib/bus/event/services'

interface ModelAggregateRootInterface {
  setCommand: (command: CommandDTO) => void
  dispatchEvent: (event: EventDTO) => void
}

export type ModelAggregateRootConstructor = new (...arguments_: any[]) => ModelAggregateRoot

export abstract class ModelAggregateRoot
  extends AggregateRoot
  implements ModelAggregateRootInterface {
  protected readonly eventProvider: EventProvider
  protected readonly logger: Logger
  protected command: CommandDTO

  public dispatchEvent(event: EventDTO) {
    this.logger.log({
      event,
      message: 'Dispatching event',
    })

    this.apply(event)
  }

  public setCommand(command: CommandDTO) {
    this.command = command
  }
}
