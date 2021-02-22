import { Injectable } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { CommandDTO } from 'lib/bus/command/dtos'
import { DomainService } from 'lib/domain/service'
import { UserDomainEventProvider } from 'src/user/domain/event/services'

import { UserModel } from './model/models'

interface UserDomainServiceInterface {
  buildUserModel: (command: CommandDTO) => UserModel
}

@Injectable()
export class UserDomainService extends DomainService implements UserDomainServiceInterface {
  constructor(
    protected readonly eventPublisher: EventPublisher,
    private readonly eventProvider: UserDomainEventProvider,
  ) {
    super(eventPublisher)
  }

  public buildUserModel(command: CommandDTO) {
    const instance = new UserModel(this.eventProvider)
    const model = this.prepareEventModel<UserModel>(instance, command)

    return model
  }
}
