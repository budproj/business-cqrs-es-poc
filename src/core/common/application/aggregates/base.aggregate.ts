import { Logger } from '@nestjs/common'
import { AggregateRoot } from '@nestjs/cqrs'

import { ID } from '@core/common/domain/value-objects/id.value-object'
import { EventStorePort } from '@core/ports/secondary/event-store.port'
import { Command } from '@infrastructure/bus/command/command'
import { Event } from '@infrastructure/bus/event/event'

const AGGREGATE_SEPARATOR = '#'

export interface ApplicationAggregateInterface {
  aggregateID: ID
  aggregateName: string

  clearEvents: () => void
  dispatchEvent: (event: Event, aggregateName: string) => Promise<void>
}

export abstract class ApplicationAggregate<P = any>
  extends AggregateRoot
  implements ApplicationAggregateInterface {
  public readonly aggregateName!: string
  protected readonly logger!: Logger
  protected readonly command!: Command
  private _events: Event[] = []

  constructor(
    public readonly aggregateID: ID,
    protected readonly properties: P,
    protected readonly eventStorePort: EventStorePort,
  ) {
    super()
  }

  get events(): Event[] {
    return this._events
  }

  public clearEvents(): void {
    this._events = []
  }

  public async dispatchEvent(event: Event) {
    this.logger.log({
      event,
      message: 'Dispatching event',
    })

    this.addEvent(event)
    super.apply(event)

    await this.persistEvent(event)
  }

  protected addEvent(event: Event): void {
    this._events.push(event)
  }

  private async persistEvent(event: Event): Promise<void> {
    const streamName = [this.aggregateName, AGGREGATE_SEPARATOR, this.aggregateID.value].join('')
    const marshalledEvent = this.eventStorePort.marshalEvent(event)

    console.log(marshalledEvent)
    // Await this.eventStorePort.publish(marshalledEvent, streamName)
  }
}
