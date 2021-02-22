import { v4 as uuidv4 } from 'uuid'

import { ActionMetadata } from 'lib/bus/action/dtos'
import { CommandDTO } from 'lib/bus/command/dtos'

import { CREATE_USER } from './constants'

export interface CommandCreateUserPayloadDTO {
  firstName: string
}

export class CreateUserCommandDTO extends CommandDTO<CommandCreateUserPayloadDTO> {
  public metadata: ActionMetadata

  constructor(public readonly payload: CommandCreateUserPayloadDTO) {
    super()

    this.metadata = {
      id: uuidv4(),
      name: CREATE_USER,
    }
  }
}
