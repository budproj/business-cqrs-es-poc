import { v4 as uuidv4 } from 'uuid'

import { ActionMetadata } from 'lib/bus/action/dtos'
import { EventDTO } from 'lib/bus/event/dtos'
import { UserDTO } from 'src/user/domain/model/dtos'

import { CREATED_USER } from './constants'

export class CreatedUserEventDTO extends EventDTO<UserDTO> {
  public metadata: ActionMetadata

  constructor(public readonly payload: UserDTO) {
    super()

    this.metadata = {
      id: uuidv4(),
      name: CREATED_USER,
    }
  }
}
