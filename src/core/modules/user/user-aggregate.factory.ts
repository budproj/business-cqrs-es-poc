import { Injectable, Logger } from '@nestjs/common'
import { EventBus } from '@nestjs/cqrs'

import { ApplicationAggregateFactory } from '@core/common/application/factories/aggregate.factory'
import { EventStorePort } from '@core/ports/secondary/event-store.port'
import { Event } from '@infrastructure/bus/event/event'

import { UserApplicationAggregate } from './user.aggregate'

@Injectable()
export class UserApplicationAggregateFactory extends ApplicationAggregateFactory<UserApplicationAggregate> {
  protected readonly logger = new Logger(UserApplicationAggregateFactory.name)
  protected readonly ApplicationAggregateConstructor = UserApplicationAggregate

  constructor(
    protected readonly eventStorePort: EventStorePort,
    protected readonly eventBus: EventBus<Event>,
  ) {
    super(eventStorePort, eventBus)
  }
}
