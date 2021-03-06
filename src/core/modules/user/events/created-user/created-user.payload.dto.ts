import { UserFirstName } from '@core/modules/user/domain/user/first-name.value-object'

interface CreatedUserPayloadProperties {
  firstName: string
}

export class CreatedUserPayload {
  public readonly firstName: UserFirstName

  constructor({ firstName }: CreatedUserPayloadProperties) {
    this.firstName = new UserFirstName(firstName)
  }
}
