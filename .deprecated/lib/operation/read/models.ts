import { Logger } from '@nestjs/common'
import { AggregateRoot } from '@nestjs/cqrs'
import { MongoRepository } from 'typeorm'

import { QueryDTO } from 'lib/cqrs/bus/query/dtos'
import { Entity } from 'lib/orm/entity'

export type OperationReadModelConstructor = new (...arguments_: any[]) => OperationReadModel

export abstract class OperationReadModel extends AggregateRoot {
  protected readonly logger: Logger
  protected readonly query: QueryDTO
  protected readonly repository: MongoRepository<Entity>
}
