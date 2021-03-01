import ID from '@core/value-objects/id.value-object'

interface CreateUserResponseProperties {
  correlationID: string
}

export class CreateUserResponse {
  public readonly correlationID: ID

  constructor({ correlationID }: CreateUserResponseProperties) {
    this.correlationID = new ID(correlationID)
  }
}
