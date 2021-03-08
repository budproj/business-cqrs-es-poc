import { Length } from 'class-validator'

import { UserFirstName } from '@core/modules/user/domain/value-objects/first-name.value-object'

type CreateUserRequestProperties = {
  firstName: string
}

export class CreateUserRequest {
  @Length(2)
  public readonly firstName: UserFirstName

  constructor({ firstName }: CreateUserRequestProperties) {
    this.firstName = new UserFirstName(firstName)
  }
}
