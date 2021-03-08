import { Logger } from '@nestjs/common'

import {
  ApplicationAggregate,
  ApplicationAggregateInterface,
} from '@core/common/application/aggregates/base.aggregate'
import { USER_AGGREGATE_NAME } from '@core/modules/user/constants'
import { CreatedUserEventPort } from '@core/ports/secondary/created-user-event.port'

import { UserEntity } from './domain/entities/user.entity'

interface UserApplicationAggregateInterface extends ApplicationAggregateInterface {
  create: (user: UserEntity) => Promise<void>
}

export class UserApplicationAggregate
  extends ApplicationAggregate
  implements UserApplicationAggregateInterface {
  public readonly aggregateName = USER_AGGREGATE_NAME
  protected readonly logger = new Logger(UserApplicationAggregate.name)

  public async create(user: UserEntity) {
    this.logger.log({
      user,
      message: `New create user request received`,
    })

    const eventData = user.unmarshal()
    const event = new CreatedUserEventPort({
      aggregateID: user.id,
      data: eventData,
      previousAction: this.command,
    })

    this.apply(event)
  }
}
