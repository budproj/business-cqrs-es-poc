import { ID } from '@core/common/domain/value-objects/id.value-object'
import { UserEntityProperties } from '@core/modules/user/domain/entities/user.entity'
import { Action } from '@infrastructure/bus/action/action'
import { Event } from '@infrastructure/bus/event/event'

export const CREATED_USER_EVENT = 'CreatedUser'
const EVENT_VERSION = 1

interface CreatedUserEventProperties {
  data: UserEntityProperties
  previousAction: Action
  aggregateID: ID
}

export class CreatedUserEvent extends Event<UserEntityProperties> {
  public readonly data!: UserEntityProperties

  constructor({ aggregateID, previousAction, data }: CreatedUserEventProperties) {
    super({
      type: CREATED_USER_EVENT,
      version: EVENT_VERSION,
      aggregateID,
      previousAction,
      data,
    })
  }
}
