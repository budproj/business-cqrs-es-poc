import { Logger } from '@nestjs/common'

import { ArgumentNotProvidedException } from '@core/exceptions/argument-not-provided.exception'
import ID from '@core/value-objects/id.value-object'
import CQRSAggregate from '@lib/cqrs/aggregate'
import Action from '@lib/cqrs/bus/action/action'
import CreatedUserEvent from '@modules/user/core/application/events/created-user/created-user.event'
import { CreateUserCommandPayload } from '@modules/user/use-cases/create-user/application/create-user.command.payload'

interface UserAggregateInterface {
  create: (userData: CreateUserCommandPayload) => void
}

class UserAggregate extends CQRSAggregate implements UserAggregateInterface {
  protected readonly logger = new Logger(UserAggregate.name)

  constructor(protected readonly command: Action) {
    super()
  }

  public create(userData?: CreateUserCommandPayload) {
    if (!userData)
      throw new ArgumentNotProvidedException(
        'You must pass user data in order to create a new user',
      )

    this.logger.log({
      userData,
      message: `New create user request received`,
    })

    const aggregateID = ID.generate()
    const event = new CreatedUserEvent({
      aggregateID,
      payload: userData,
      previousAction: this.command,
    })

    this.dispatchEvent(event)
  }
}

export default UserAggregate
