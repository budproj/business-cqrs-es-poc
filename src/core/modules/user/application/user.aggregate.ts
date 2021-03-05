import { Logger } from '@nestjs/common'

import { ApplicationAggregate } from '@core/common/application/aggregates/base.aggregate'
import { ID } from '@core/common/domain/value-objects/id.value-object'
import { ArgumentNotProvidedException } from '@core/common/exceptions/argument-not-provided.exception'
import { Command } from '@infrastructure/bus/command/command'

import { CreatedUserEvent } from './events/created-user/created-user.event'
import { CreatedUserPayload } from './events/created-user/created-user.payload.dto'
import { CreateUserApplicationRequest } from './requests/create-user.request'

interface UserAggregateInterface {
  create: (createUserRequest: CreateUserApplicationRequest) => void
}

export class UserAggregate extends ApplicationAggregate implements UserAggregateInterface {
  protected readonly logger = new Logger(UserAggregate.name)

  constructor(protected readonly command: Command) {
    super()
  }

  public create(createUserRequest?: CreateUserApplicationRequest) {
    if (!createUserRequest)
      throw new ArgumentNotProvidedException('You must pass user data to create a new user')

    this.logger.log({
      createUserRequest,
      message: `New create user request received`,
    })

    const aggregateID = ID.generate()
    const eventPayload = new CreatedUserPayload(createUserRequest)
    const event = new CreatedUserEvent({
      aggregateID,
      payload: eventPayload,
      previousAction: this.command,
    })

    this.dispatchEvent(event)
  }
}
