import { Length } from 'class-validator'

interface CreateUserRequestProperties {
  firstName: string
}

export class CreateUserRequest {
  @Length(2)
  public readonly firstName: string

  constructor({ firstName }: CreateUserRequestProperties) {
    this.firstName = firstName
  }
}
