import { Logger } from '@nestjs/common'
import { AggregateRoot } from '@nestjs/cqrs'

import Action from '@lib/cqrs/bus/action/action'
import ID from '@lib/ddd/value-objects/id.value-object'

interface CQRSAggregateInterface {
  clearEvents: () => void
  dispatchEvent: (event: Action) => void
}

abstract class CQRSAggregate extends AggregateRoot implements CQRSAggregateInterface {
  protected readonly logger!: Logger
  protected readonly command!: Action
  protected readonly aggregateID!: ID
  private _events: Action[] = []

  get events(): Action[] {
    return this._events
  }

  public clearEvents(): void {
    this._events = []
  }

  public dispatchEvent(event: Action) {
    this.logger.log({
      event,
      message: 'Dispatching event',
    })

    this.addEvent(event)
    super.apply(event)
  }

  protected addEvent(event: Action): void {
    this._events.push(event)
  }
}

export default CQRSAggregate
