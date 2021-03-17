import { Action } from '@infrastructure/bus/action/action'
import { Command } from '@infrastructure/bus/command/command'

type CreateUserCommandPortProperties = {
  data: CreateUserCommandPortData
  previousAction?: Action
}

type CreateUserCommandPortData = {
  firstName: string
}

export const CREATE_USER_COMMAND = 'CreateUser'

export class CreateUserCommandPort extends Command<CreateUserCommandPortData> {
  public readonly data!: CreateUserCommandPortData

  constructor({ previousAction, data }: CreateUserCommandPortProperties) {
    super({
      type: CREATE_USER_COMMAND,
      previousAction,
      data,
    })
  }
}
