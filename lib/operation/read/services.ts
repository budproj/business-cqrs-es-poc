import { MongoRepository } from 'typeorm'

import { CommandDTO } from 'lib/bus/command/dtos'
import { QueryDTO } from 'lib/bus/query/dtos'
import { Entity } from 'lib/orm/entity'

import { OperationReadModel, OperationReadModelConstructor } from './models'

interface OperationReadServiceInterface<I extends OperationReadModel> {
  buildReadModel: (command: CommandDTO) => I
}

export abstract class OperationReadService<I extends OperationReadModel = OperationReadModel>
  implements OperationReadServiceInterface<I> {
  protected readonly ModelConstructor: OperationReadModelConstructor

  constructor(protected readonly repository: MongoRepository<Entity>) {}

  public buildReadModel(query: QueryDTO): I {
    const model = new this.ModelConstructor(query, this.repository)

    return model as I
  }
}
