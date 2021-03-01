import Name from '@core/value-objects/name.value-object'

interface CreatedUserPayloadProperties {
  firstName: Name
}

export class CreatedUserPayload {
  public readonly firstName: Name

  constructor({ firstName }: CreatedUserPayloadProperties) {
    this.firstName = firstName
  }
}
