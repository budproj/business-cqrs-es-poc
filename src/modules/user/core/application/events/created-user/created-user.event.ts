import Action from '@lib/cqrs/bus/action/action'

import { CreatedUserPayload } from './created-user.payload.dto'
import { CREATED_USER_EVENT } from './constants'
import { CreateUserRequest } from '@modules/user/use-cases/create-user/presentation/create-user.request.dto'

interface CreatedUserEventProperties {
  payload: CreatedUserPayload
  previousAction: Action<CreateUserRequest>
}

class CreatedUserEvent extends Action<CreatedUserPayload> {
  constructor({ previousAction, payload }: CreatedUserEventProperties) {
    super({
      name: CREATED_USER_EVENT,
      previousAction,
      payload,
    })
  }
}

export default CreatedUserEvent
