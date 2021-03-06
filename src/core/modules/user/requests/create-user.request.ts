import { Length } from 'class-validator'

import { DomainRequest } from '@core/common/domain/requests/base.request'
import { UserEntityProperties } from '@core/modules/user/domain/entities/user.entity'
import { UserFirstName } from '@core/modules/user/domain/value-objects/first-name.value-object'

interface CreateUserRequestProperties {
  firstName: string
}

export class CreateUserRequest implements DomainRequest<UserEntityProperties> {
  @Length(2)
  public readonly firstName: string

  constructor({ firstName }: CreateUserRequestProperties) {
    this.firstName = firstName
  }

  public marshal() {
    return {
      firstName: new UserFirstName(this.firstName),
    }
  }
}
