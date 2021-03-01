import { ActionMetadata } from 'lib/cqrs/bus/action/dtos'
import { EventDTO, EventParameters } from 'lib/cqrs/bus/event/dtos'
import { NewUserDTO } from 'src/user/domain/model/dtos'

import { CREATED_USER } from './constants'

export class CreatedUserEventDTO extends EventDTO<NewUserDTO> {
  public metadata: ActionMetadata

  constructor(
    public readonly payload: NewUserDTO,
    { previousAction }: Partial<EventParameters> = {},
  ) {
    super({
      previousAction,
      name: CREATED_USER,
    })
  }
}
