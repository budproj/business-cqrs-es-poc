import { Logger } from '@nestjs/common'
import { AggregateRoot as NestAggregateRoot } from '@nestjs/cqrs'

import { EventDTO } from 'lib/bus/event/dtos'
import { EventProvider } from 'lib/bus/event/services'

interface AggregateRootInterface {
  dispatchEvent: (event: EventDTO) => void
}

export abstract class AggregateRoot extends NestAggregateRoot implements AggregateRootInterface {
  protected readonly eventProvider: EventProvider
  protected readonly logger: Logger

  public dispatchEvent(event: EventDTO) {
    this.logger.log({
      event,
      message: 'Dispatching event',
    })

    this.apply(event)
  }
}
