import ID from '@core/value-objects/id.value-object'
import Action from '@lib/cqrs/bus/action/action'
import Event from '@lib/cqrs/bus/event/event'

import { CREATED_USER_EVENT } from './constants'
import { CreatedUserPayload } from './created-user.payload.dto'

interface CreatedUserEventProperties {
  payload: CreatedUserPayload
  previousAction: Action
  aggregateID: ID
}

class CreatedUserEvent extends Event<CreatedUserPayload> {
  constructor({ aggregateID, previousAction, payload }: CreatedUserEventProperties) {
    super({
      name: CREATED_USER_EVENT,
      aggregateID,
      previousAction,
      payload,
    })
  }
}

export default CreatedUserEvent
