import { Logger } from '@nestjs/common'

import {
  ApplicationAggregate,
  ApplicationAggregateInterface,
} from '@core/common/application/aggregates/base.aggregate'
import { USER_AGGREGATE_NAME } from '@core/modules/user/constants'
import { CreatedUserEvent, CreatedUserEventData } from '@core/ports/secondary/created-user.event'
import { EventStorePort } from '@core/ports/secondary/event-store.port'
import { Command } from '@infrastructure/bus/command/command'

import { UserEntity } from './domain/entities/user.entity'

interface UserAggregateInterface extends ApplicationAggregateInterface {
  create: (user: UserEntity) => Promise<void>
}

export class UserAggregate
  extends ApplicationAggregate<UserEntity>
  implements UserAggregateInterface {
  public readonly aggregateName = USER_AGGREGATE_NAME
  protected readonly logger = new Logger(UserAggregate.name)

  constructor(
    protected readonly properties: UserEntity,
    protected readonly command: Command,
    protected readonly eventStorePort: EventStorePort,
  ) {
    super(properties.id, properties, eventStorePort)
  }

  public async create(user: UserEntity) {
    this.logger.log({
      user,
      message: `New create user request received`,
    })

    const eventData = new CreatedUserEventData(user)
    const event = new CreatedUserEvent({
      aggregateID: user.id,
      data: eventData,
      previousAction: this.command,
    })

    await this.dispatchEvent(event)
  }
}
