import { Entity, EntityInterface, EntityProperties } from '@core/common/domain/entities/base.entity'
import { UserFirstName } from '@core/modules/user/domain/value-objects/first-name.value-object'

interface UserEntityInterface extends EntityInterface<UserEntityProperties> {
  unmarshal: () => UnmarshalledUserEntity
}

export interface UserEntityProperties extends EntityProperties {
  firstName: UserFirstName
}

export interface UnmarshalledUserEntity {
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
    const unmarshalledUser: UnmarshalledUserEntity = {
      id: this.id.unmarshal(),
      firstName: this.firstName.unmarshal(),
      createdAt: this.createdAt.unmarshal(),
      updatedAt: this.updatedAt.unmarshal(),
    }

    return unmarshalledUser
  }
}
