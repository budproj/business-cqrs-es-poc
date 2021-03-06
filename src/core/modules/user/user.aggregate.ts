import { Logger } from '@nestjs/common'

import { ApplicationAggregate } from '@core/common/application/aggregates/base.aggregate'
import { ArgumentNotProvidedException } from '@core/common/exceptions/argument-not-provided.exception'
import { Command } from '@infrastructure/bus/command/command'

import { UserAggregateRoot } from './domain/user.aggregate-root'
import { CreatedUserEvent } from './events/created-user/created-user.event'
import { CreateUserRequest } from './requests/create-user.request'

interface UserAggregateInterface {
  create: (createUserRequest: CreateUserRequest) => void
}

export class UserAggregate extends ApplicationAggregate implements UserAggregateInterface {
  protected readonly logger = new Logger(UserAggregate.name)

  constructor(protected readonly command: Command) {
    super()
  }

  public create(createUserRequest?: CreateUserRequest) {
    if (!createUserRequest)
      throw new ArgumentNotProvidedException('You must pass user data to create a new user')

    this.logger.log({
      createUserRequest,
      message: `New create user request received`,
    })

    const marshalledRequest = createUserRequest.marshal()
    const user = UserAggregateRoot.createUser(marshalledRequest)

    const event = new CreatedUserEvent({
      aggregateID: user.id,
      payload: user,
      previousAction: this.command,
    })

    console.log(event)

    this.dispatchEvent(event)
  }
}
