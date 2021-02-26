import Action from '@lib/bus/action/action.dto'

import { CREATE_USER_COMMAND } from './constants'
import { CreateUserInput } from './create-user.graphql.dto'

interface CreateUserCommandProperties {
  payload: CreateUserInput
  previousAction?: Action
}

export class CreateUserCommand extends Action<CreateUserInput> {
  constructor({ previousAction, payload }: CreateUserCommandProperties) {
    super({
      name: CREATE_USER_COMMAND,
      previousAction,
      payload,
    })
  }
}
