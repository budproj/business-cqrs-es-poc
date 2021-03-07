import { CreateUserRequest } from '@core/modules/user/requests/create-user.request'
import { Action } from '@infrastructure/bus/action/action'
import { Command } from '@infrastructure/bus/command/command'

interface CreateUserCommandProperties {
  data: CreateUserRequest
  previousAction?: Action
}

export const CREATE_USER_COMMAND = 'CreateUser'

export class CreateUserCommand extends Command<CreateUserRequest> {
  public readonly data!: CreateUserRequest

  constructor({ previousAction, data }: CreateUserCommandProperties) {
    super({
      type: CREATE_USER_COMMAND,
      previousAction,
      data,
    })
  }
}
