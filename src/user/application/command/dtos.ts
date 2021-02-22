import { ActionMetadata } from 'lib/bus/action/dtos'
import { CommandDTO, CommandParameters } from 'lib/bus/command/dtos'

import { CREATE_USER } from './constants'

export interface CommandCreateUserPayloadDTO {
  firstName: string
}

export class CreateUserCommandDTO extends CommandDTO<CommandCreateUserPayloadDTO> {
  public metadata: ActionMetadata

  constructor(
    public readonly payload: CommandCreateUserPayloadDTO,
    { previousAction }: Partial<CommandParameters> = {},
  ) {
    super({
      previousAction,
      name: CREATE_USER,
    })
  }
}
