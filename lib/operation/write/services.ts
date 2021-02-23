import { EventPublisher } from '@nestjs/cqrs'

import { CommandDTO } from 'lib/bus/command/dtos'
import { EventProvider } from 'lib/bus/event/services'

import { OperationWriteModel, OperationWriteModelConstructor } from './models'

interface OperationWriteServiceInterface<I extends OperationWriteModel> {
  buildWriteModel: (command: CommandDTO) => I
  prepareEventModel: (instance: I, command: CommandDTO) => I
}

export abstract class OperationWriteService<I extends OperationWriteModel = OperationWriteModel>
  implements OperationWriteServiceInterface<I> {
  protected readonly ModelConstructor: OperationWriteModelConstructor

  constructor(
    protected readonly eventPublisher: EventPublisher,
    protected readonly eventProvider: EventProvider,
  ) {}

  public buildWriteModel(command: CommandDTO) {
    const instance = new this.ModelConstructor<I>(command, this.eventProvider)
    const model = this.prepareEventModel(instance)

    return model
  }

  public prepareEventModel(instance: I) {
    const model = this.eventPublisher.mergeObjectContext<I>(instance)

    return model
  }
}
