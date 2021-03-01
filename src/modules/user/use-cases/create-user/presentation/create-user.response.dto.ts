import ID from '@lib/ddd/value-objects/id.value-object'

interface CreateUserResponseProperties {
  correlationID: ID
}

export class CreateUserResponse {
  public readonly correlationID: ID

  constructor({ correlationID }: CreateUserResponseProperties) {
    this.correlationID = correlationID
  }
}
