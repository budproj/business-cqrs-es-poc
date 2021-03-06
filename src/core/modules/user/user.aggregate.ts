import { Logger } from '@nestjs/common'

import { ApplicationAggregate } from '@core/common/application/aggregates/base.aggregate'
import { CreatedUserEvent } from '@core/ports/secondary/created-user.event'
import { Command } from '@infrastructure/bus/command/command'

import { UserEntity } from './domain/entities/user.entity'

interface UserAggregateInterface {
  create: (user: UserEntity) => void
}

export class UserAggregate extends ApplicationAggregate implements UserAggregateInterface {
  protected readonly logger = new Logger(UserAggregate.name)

  constructor(protected readonly command: Command) {
    super()
  }

  public create(user: UserEntity) {
    this.logger.log({
      user,
      message: `New create user request received`,
    })

    const event = new CreatedUserEvent({
      aggregateID: user.id,
      payload: user,
      previousAction: this.command,
    })

    this.dispatchEvent(event)
  }
}
