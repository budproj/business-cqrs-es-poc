import { ID } from '@core/common/domain/value-objects/id.value-object'
import { UnmarshalledUserEntity, UserEntity } from '@core/modules/user/domain/entities/user.entity'
import { Action } from '@infrastructure/bus/action/action'
import { Event, UnmarshalledEvent } from '@infrastructure/bus/event/event'

export const CREATED_USER_EVENT = 'CreatedUser'
const EVENT_VERSION = 1

export interface UnmarshalledCreatedUserEvent extends UnmarshalledEvent<UnmarshalledUserEntity> {}

interface CreatedUserEventProperties {
  data: UserEntity
  previousAction: Action
  aggregateID: ID
}

export class CreatedUserEvent extends Event<UserEntity> {
  public readonly data!: UserEntity

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
