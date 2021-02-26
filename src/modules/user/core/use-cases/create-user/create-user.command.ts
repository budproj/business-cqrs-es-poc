import Action from '@lib/bus/action/action'
import { CreateUserRequest } from '@modules/user/core/use-cases/create-user/create-user.request.dto'

import { CREATE_USER_COMMAND } from './constants'

interface CreateUserCommandProperties {
  payload: CreateUserRequest
  previousAction?: Action
}

export class CreateUserCommand extends Action<CreateUserRequest> {
  constructor({ previousAction, payload }: CreateUserCommandProperties) {
    super({
      name: CREATE_USER_COMMAND,
      previousAction,
      payload,
    })
  }
}
