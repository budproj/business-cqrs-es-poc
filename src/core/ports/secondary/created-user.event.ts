import { ID } from '@core/common/domain/value-objects/id.value-object'
import { USER_AGGREGATE_NAME } from '@core/modules/user/constants'
import { UserEntityProperties } from '@core/modules/user/domain/entities/user.entity'
import { Action } from '@infrastructure/bus/action/action'
import { EVENT_PREFIX } from '@infrastructure/bus/event/constants'
import { Event } from '@infrastructure/bus/event/event'

export const CREATED_USER_EVENT = `${EVENT_PREFIX}::${USER_AGGREGATE_NAME}::CREATED`

interface CreatedUserEventProperties {
  payload: UserEntityProperties
  previousAction: Action
  aggregateID: ID
}

export class CreatedUserEvent extends Event<UserEntityProperties> {
  public readonly payload!: UserEntityProperties

  constructor({ aggregateID, previousAction, payload }: CreatedUserEventProperties) {
    super({
      name: CREATED_USER_EVENT,
      aggregateID,
      previousAction,
      payload,
    })
  }
}
