import { Logger } from '@nestjs/common'
import { EventBus } from '@nestjs/cqrs'

import { ApplicationAggregate } from '@core/common/application/aggregates/base.aggregate'
import { Entity } from '@core/common/domain/entities/base.entity'
import { Constructor } from '@core/common/types/constructor.type'
import { EventStorePort } from '@core/ports/secondary/event-store.port'
import { Command } from '@infrastructure/bus/command/command'
import { Event } from '@infrastructure/bus/event/event'

export interface ApplicationAggregateFactoryInterface<A extends ApplicationAggregate> {
  createAggregateForEntity: (entity: Entity, command: Command) => A
}

export abstract class ApplicationAggregateFactory<
  A extends ApplicationAggregate = ApplicationAggregate
> implements ApplicationAggregateFactoryInterface<A> {
  protected readonly logger!: Logger
  protected readonly ApplicationAggregateConstructor!: Constructor<A>

  constructor(
    protected readonly eventStorePort: EventStorePort,
    protected readonly eventBus: EventBus<Event>,
  ) {}

  public createAggregateForEntity(entity: Entity, command: Command) {
    return new this.ApplicationAggregateConstructor(
      entity,
      command,
      this.eventStorePort,
      this.eventBus,
    )
  }
}
