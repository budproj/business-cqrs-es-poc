import { CreateUserCommand } from '@modules/user/use-cases/create-user/application/create-user.command'

export class CreateUserGraphQLResponse {
  public readonly correlationID: string

  constructor({ tracing }: CreateUserCommand) {
    this.correlationID = tracing.correlationID.value
  }
}
