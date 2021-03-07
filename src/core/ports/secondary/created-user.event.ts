import { ID } from '@core/common/domain/value-objects/id.value-object'
import { UserEntity, UserEntityProperties } from '@core/modules/user/domain/entities/user.entity'
import { Action } from '@infrastructure/bus/action/action'
import { EventData } from '@infrastructure/bus/event/data'
import { Event } from '@infrastructure/bus/event/event'

export const CREATED_USER_EVENT = 'CreatedUser'
const EVENT_VERSION = 1

export class CreatedUserEventData extends EventData<UserEntityProperties> {
  constructor(public readonly user: UserEntity) {
    super()
  }

  public unmarshal() {
    return this.user.unmarshal()
  }
}

interface CreatedUserEventProperties {
  data: CreatedUserEventData
  previousAction: Action
  aggregateID: ID
}

export class CreatedUserEvent extends Event<CreatedUserEventData> {
  public readonly data!: CreatedUserEventData

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
