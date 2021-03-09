import { Logger } from '@nestjs/common'
import { AggregateRoot, EventBus } from '@nestjs/cqrs'

import { Entity } from '@core/common/domain/entities/base.entity'
import { ID } from '@core/common/domain/value-objects/id.value-object'
import { ArgumentNotProvidedException } from '@core/common/exceptions/argument-not-provided.exception'
import { EventStorePort } from '@core/ports/secondary/event-store.port'
import { Command } from '@infrastructure/bus/command/command'
import { Event } from '@infrastructure/bus/event/event'

const AGGREGATE_SEPARATOR = '-'

export interface ApplicationAggregateInterface {
  aggregateName: string

  publish: <E extends Event = Event>(event: E) => Promise<void>
}

export abstract class ApplicationAggregate
  extends AggregateRoot<Event>
  implements ApplicationAggregateInterface {
  public readonly aggregateName!: string
  protected readonly aggregateID: ID
  protected readonly logger!: Logger

  constructor(
    protected readonly entity: Entity,
    protected readonly command: Command,
    protected readonly eventStorePort: EventStorePort,
    protected readonly eventBus: EventBus<Event>,
  ) {
    super()

    this.aggregateID = entity.id
  }

  public async publish(event: Event) {
    this.logger.log({
      event,
      message: 'Publishing event',
    })

    await this.persistEvent(event)
    await this.eventBus.publish(event)
  }

  private async persistEvent(event: Event): Promise<void> {
    if (!this.aggregateID)
      throw new ArgumentNotProvidedException(
        'You must define an aggregate ID before publishing an event',
      )

    const streamName = [this.aggregateName, AGGREGATE_SEPARATOR, this.aggregateID.value].join('')
    const marshalledEvent = this.eventStorePort.marshalEvent(event)

    await this.eventStorePort.publish(marshalledEvent, streamName)
  }
}
