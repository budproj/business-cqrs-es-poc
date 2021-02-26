import Name from '@core/value-objects/name.value-object'

interface CreateUserRequestProperties {
  firstName: string
}

export class CreateUserRequest {
  public readonly firstName: Name

  constructor(protected readonly properties: CreateUserRequestProperties) {
    this.firstName = new Name(properties.firstName)
  }
}
