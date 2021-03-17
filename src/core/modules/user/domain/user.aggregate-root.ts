import { ID } from '@core/common/domain/value-objects/id.value-object'
import { UserEntity, UserEntityProperties } from '@core/modules/user/domain/entities/user.entity'

interface UserAggregateInterface {
  aggregateID: ID
}

export class UserAggregateRoot implements UserAggregateInterface {
  public readonly aggregateID!: ID

  static createUser(data: UserEntityProperties) {
    return new UserEntity(data)
  }
}
