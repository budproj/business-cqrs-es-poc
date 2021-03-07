import { Entity, EntityInterface, EntityProperties } from '@core/common/domain/entities/base.entity'
import { UserFirstName } from '@core/modules/user/domain/value-objects/first-name.value-object'

interface UserEntityInterface extends EntityInterface<UserEntityProperties> {
  unmarshal: () => UnmarshalledUser
}

export interface UserEntityProperties extends EntityProperties {
  firstName: UserFirstName
}

export interface UnmarshalledUser {
  id: string
  firstName: string
  createdAt: Date
  updatedAt: Date
}

export class UserEntity extends Entity<UserEntityProperties> implements UserEntityInterface {
  public readonly firstName: UserFirstName

  constructor(protected readonly properties: UserEntityProperties) {
    super(properties)

    this.firstName = properties.firstName
  }

  public unmarshal() {
    const unmarshalledUser: UnmarshalledUser = {
      id: this.id.unmarshal(),
      firstName: this.firstName.unmarshal(),
      createdAt: this.createdAt.unmarshal(),
      updatedAt: this.updatedAt.unmarshal(),
    }

    return unmarshalledUser
  }
}
