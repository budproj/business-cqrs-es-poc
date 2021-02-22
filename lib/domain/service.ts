import { EventPublisher } from '@nestjs/cqrs'

import { CommandDTO } from 'lib/bus/command/dtos'
import { ModelAggregateRoot } from 'lib/models/aggregate-root'

interface DomainServiceInterface {
  prepareEventModel: <I extends ModelAggregateRoot = ModelAggregateRoot>(
    instance: I,
    command: CommandDTO,
  ) => I
}

export abstract class DomainService implements DomainServiceInterface {
  constructor(protected readonly eventPublisher: EventPublisher) {}

  public prepareEventModel<I extends ModelAggregateRoot = ModelAggregateRoot>(
    instance: I,
    command: CommandDTO,
  ) {
    const model = this.eventPublisher.mergeObjectContext<I>(instance)
    model.setCommand(command)

    return model
  }
}
