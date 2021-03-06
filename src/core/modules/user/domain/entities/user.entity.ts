import { Entity, EntityProperties } from '@core/common/domain/entities/base.entity'
import { UserFirstName } from '@core/modules/user/domain/value-objects/first-name.value-object'

export interface UserEntityProperties extends EntityProperties {
  firstName: UserFirstName
}

export class UserEntity extends Entity<UserEntityProperties> {
  public readonly firstName: UserFirstName

  constructor(protected readonly properties: UserEntityProperties) {
    super(properties)

    this.firstName = properties.firstName
  }

  protected validate(_properties: UserEntityProperties) {}
}
