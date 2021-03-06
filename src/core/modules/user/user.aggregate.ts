import { Logger } from '@nestjs/common'

import { ApplicationAggregate } from '@core/common/application/aggregates/base.aggregate'
import { USER_AGGREGATE_NAME } from '@core/modules/user/constants'
import { CreatedUserEvent } from '@core/ports/secondary/created-user.event'
import { EventStorePort } from '@core/ports/secondary/event-store.port'
import { Command } from '@infrastructure/bus/command/command'

import { UserEntity } from './domain/entities/user.entity'

interface UserAggregateInterface {
  create: (user: UserEntity) => Promise<void>
}

export class UserAggregate extends ApplicationAggregate implements UserAggregateInterface {
  public readonly aggregateName = USER_AGGREGATE_NAME
  protected readonly logger = new Logger(UserAggregate.name)

  constructor(
    protected readonly command: Command,
    protected readonly eventStorePort: EventStorePort,
  ) {
    super(eventStorePort)
  }

  public async create(user: UserEntity) {
    this.logger.log({
      user,
      message: `New create user request received`,
    })

    const event = new CreatedUserEvent({
      aggregateID: user.id,
      payload: user,
      previousAction: this.command,
    })

    await this.dispatchEvent(event)
  }
}
