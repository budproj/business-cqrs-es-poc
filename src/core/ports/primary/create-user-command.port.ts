import { Action } from '@infrastructure/bus/action/action'
import { Command } from '@infrastructure/bus/command/command'

interface CreateUserCommandPortProperties {
  data: CreateUserCommandPortData
  previousAction?: Action
}

interface CreateUserCommandPortData {
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
