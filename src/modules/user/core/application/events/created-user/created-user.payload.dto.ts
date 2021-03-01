import Name from '@core/value-objects/name.value-object'

interface CreatedUserPayloadProperties {
  firstName: Name
}

export class CreatedUserPayload {
  public readonly firstName: Name

  constructor(protected readonly properties: CreatedUserPayloadProperties) {
    this.firstName = properties.firstName
  }
}
