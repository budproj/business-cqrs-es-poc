import Action from '@lib/cqrs/bus/action/action'
import { CreateUserRequest } from '@modules/user/use-cases/create-user/presentation/create-user.request.dto'

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
