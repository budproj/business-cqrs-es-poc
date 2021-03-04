import Action from '@lib/cqrs/bus/action/action'
import Command from '@lib/cqrs/bus/command/command'

import { CREATE_USER_COMMAND } from './constants'
import { CreateUserCommandPayload } from './create-user.command.payload'

interface CreateUserCommandProperties {
  payload: CreateUserCommandPayload
  previousAction?: Action
}

export class CreateUserCommand extends Command<CreateUserCommandPayload> {
  constructor({ previousAction, payload }: CreateUserCommandProperties) {
    super({
      name: CREATE_USER_COMMAND,
      previousAction,
      payload,
    })
  }
}
