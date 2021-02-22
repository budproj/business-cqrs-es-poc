import { ActionMetadata } from 'lib/bus/action/dtos'
import { EventDTO, EventParameters } from 'lib/bus/event/dtos'
import { UserDTO } from 'src/user/domain/model/dtos'

import { CREATED_USER } from './constants'

export class CreatedUserEventDTO extends EventDTO<UserDTO> {
  public metadata: ActionMetadata

  constructor(public readonly payload: UserDTO, { previousAction }: Partial<EventParameters> = {}) {
    super({
      previousAction,
      name: CREATED_USER,
    })
  }
}
