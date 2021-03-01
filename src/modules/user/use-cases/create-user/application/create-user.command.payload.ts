import Name from '@core/value-objects/name.value-object'

interface CreateUserCommandPayloadProperties {
  firstName: Name
}

export class CreateUserCommandPayload {
  public readonly firstName: Name

  constructor({ firstName }: CreateUserCommandPayloadProperties) {
    this.firstName = firstName
  }
}
