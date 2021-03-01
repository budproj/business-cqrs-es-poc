import Action from '@lib/cqrs/bus/action/action'

import { CREATE_USER_COMMAND } from './constants'
import { CreateUserCommandPayload } from './create-user.command.payload'

interface CreateUserCommandProperties {
  payload: CreateUserCommandPayload
  previousAction?: Action
}

export class CreateUserCommand extends Action<CreateUserCommandPayload> {
  constructor({ previousAction, payload }: CreateUserCommandProperties) {
    super({
      name: CREATE_USER_COMMAND,
      previousAction,
      payload,
    })
  }
}
