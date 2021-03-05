import { Logger } from '@nestjs/common'
import { AggregateRoot } from '@nestjs/cqrs'

import ID from '@core/common/domain/value-objects/id.value-object'
import { Command } from '@infrastructure/bus/command/command'
import { Event } from '@infrastructure/bus/event/event'

interface ApplicationBaseAggregateInterface {
  clearEvents: () => void
  dispatchEvent: (event: Event) => void
}

export abstract class ApplicationBaseAggregate
  extends AggregateRoot
  implements ApplicationBaseAggregateInterface {
  protected readonly logger!: Logger
  protected readonly command!: Command
  protected readonly aggregateID!: ID
  private _events: Event[] = []

  get events(): Event[] {
    return this._events
  }

  public clearEvents(): void {
    this._events = []
  }

  public dispatchEvent(event: Event) {
    this.logger.log({
      event,
      message: 'Dispatching event',
    })

    this.addEvent(event)
    super.apply(event)
  }

  protected addEvent(event: Event): void {
    this._events.push(event)
  }
}
