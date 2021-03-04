import { Injectable } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import UserAggregate from '@modules/user/core/application/user.aggregate'

import { CreateUserCommand } from './create-user.command'

interface CreateUserServiceInterface {
  createUser: (createUserCommand: CreateUserCommand) => Promise<any>
}

@Injectable()
class CreateUserService implements CreateUserServiceInterface {
  constructor(protected readonly eventPublisher: EventPublisher) {}

  public async createUser(createUserCommand: CreateUserCommand) {
    const userAggregateInstance = new UserAggregate(createUserCommand)
    const userAggregate = this.eventPublisher.mergeObjectContext(userAggregateInstance)

    userAggregate.create(createUserCommand.payload)
    userAggregate.commit()
  }
}

export default CreateUserService
