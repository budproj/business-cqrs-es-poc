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
    const userAggregate = new UserAggregate(createUserCommand)
    const test = this.eventPublisher.mergeObjectContext(userAggregate)

    test.create(createUserCommand.payload)
    test.commit()
  }
}

export default CreateUserService
