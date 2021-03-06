import { ID } from '@core/common/domain/value-objects/id.value-object'
import { UserEntityProperties } from '@core/modules/user/domain/entities/user.entity'
import { Action } from '@infrastructure/bus/action/action'
import { Event } from '@infrastructure/bus/event/event'

import { CREATED_USER_EVENT } from './constants'

interface CreatedUserEventProperties {
  payload: UserEntityProperties
  previousAction: Action
  aggregateID: ID
}

export class CreatedUserEvent extends Event<UserEntityProperties> {
  constructor({ aggregateID, previousAction, payload }: CreatedUserEventProperties) {
    super({
      name: CREATED_USER_EVENT,
      aggregateID,
      previousAction,
      payload,
    })
  }
}
