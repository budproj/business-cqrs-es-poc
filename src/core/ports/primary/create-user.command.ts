import { USER_AGGREGATE_NAME } from '@core/modules/user/constants'
import { CreateUserRequest } from '@core/modules/user/requests/create-user.request'
import { Action } from '@infrastructure/bus/action/action'
import { Command } from '@infrastructure/bus/command/command'
import { COMMAND_PREFIX } from '@infrastructure/bus/command/constants'

interface CreateUserCommandProperties {
  payload: CreateUserRequest
  previousAction?: Action
}

export const CREATE_USER_COMMAND = `${COMMAND_PREFIX}::${USER_AGGREGATE_NAME}::CREATE`

export class CreateUserCommand extends Command<CreateUserRequest> {
  public readonly payload!: CreateUserRequest

  constructor({ previousAction, payload }: CreateUserCommandProperties) {
    super({
      name: CREATE_USER_COMMAND,
      previousAction,
      payload,
    })
  }
}
