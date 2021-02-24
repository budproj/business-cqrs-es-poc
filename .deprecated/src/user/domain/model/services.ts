import { Injectable } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { OperationReadService } from 'lib/operation/read/services'
import { OperationWriteService } from 'lib/operation/write/services'
import { UserDomainEventProvider } from 'src/user/domain/event/services'
import { UserRegistrationEntity } from 'src/user/infrastructure/entities'

import { UserRegistrationReadModel } from './read'
import { UserWriteModel } from './write'

@Injectable()
export class UserWriteModelService extends OperationWriteService<UserWriteModel> {
  constructor(
    protected readonly eventPublisher: EventPublisher,
    protected readonly eventProvider: UserDomainEventProvider,
  ) {
    super(eventPublisher, eventProvider)
  }
}

@Injectable()
export class UserReadRegistrationModelService extends OperationReadService<UserRegistrationReadModel> {
  protected readonly ModelConstructor = UserRegistrationReadModel

  constructor(
    @InjectRepository(UserRegistrationEntity)
    protected readonly repository: MongoRepository<UserRegistrationEntity>,
  ) {
    super(repository)
  }
}

@Injectable()
export class UserReadServiceProvider {
  constructor(public readonly userRegistration: UserReadRegistrationModelService) {}
}
