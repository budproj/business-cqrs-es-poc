import { Length } from 'class-validator'

interface CreateUserApplicationRequestProperties {
  firstName: string
}

export class CreateUserApplicationRequest {
  @Length(2)
  public readonly firstName: string

  constructor({ firstName }: CreateUserApplicationRequestProperties) {
    this.firstName = firstName
  }
}
