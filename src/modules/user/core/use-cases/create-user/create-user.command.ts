import Action from '@lib/bus/action/action.dto'

import { CREATE_USER_COMMAND } from './constants'
import { CreateUserInput } from './create-user.graphql.dto'

interface CreateUserCommandProps {
  payload: CreateUserInput
  previousAction?: Action
}

export class CreateUserCommand extends Action<CreateUserInput> {
  constructor(public readonly props: CreateUserCommandProps) {
    super({
      name: CREATE_USER_COMMAND,
      previousAction: props.previousAction,
    })
  }
}
