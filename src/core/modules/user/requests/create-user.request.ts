import { Length } from 'class-validator'

import { ApplicationRequest } from '@core/common/application/requests/base.request'
import { UserEntityProperties } from '@core/modules/user/domain/entities/user.entity'
import { UserFirstName } from '@core/modules/user/domain/value-objects/first-name.value-object'

interface CreateUserRequestProperties {
  firstName: string
}

export class CreateUserRequest implements ApplicationRequest<UserEntityProperties> {
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
