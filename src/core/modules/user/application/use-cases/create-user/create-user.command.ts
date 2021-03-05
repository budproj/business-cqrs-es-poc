import { CreateUserApplicationRequest } from '@core/modules/user/application/requests/create-user.request'
import { Action } from '@infrastructure/bus/action/action'
import { Command } from '@infrastructure/bus/command/command'

import { CREATE_USER_COMMAND } from './constants'

interface CreateUserCommandProperties {
  payload: CreateUserApplicationRequest
  previousAction?: Action
}

export class CreateUserCommand extends Command<CreateUserApplicationRequest> {
  constructor({ previousAction, payload }: CreateUserCommandProperties) {
    super({
      name: CREATE_USER_COMMAND,
      previousAction,
      payload,
    })
  }
}
