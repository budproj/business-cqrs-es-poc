import { ID } from '@core/common/domain/value-objects/id.value-object'
import { Action } from '@infrastructure/bus/action/action'
import { Event } from '@infrastructure/bus/event/event'

import { CREATED_USER_EVENT } from './constants'
import { CreatedUserPayload } from './created-user.payload.dto'

interface CreatedUserEventProperties {
  payload: CreatedUserPayload
  previousAction: Action
  aggregateID: ID
}

export class CreatedUserEvent extends Event<CreatedUserPayload> {
  constructor({ aggregateID, previousAction, payload }: CreatedUserEventProperties) {
    super({
      name: CREATED_USER_EVENT,
      aggregateID,
      previousAction,
      payload,
    })
  }
}
