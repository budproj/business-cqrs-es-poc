import { ActionMetadata } from 'lib/cqrs/bus/action/dtos'
import { CommandDTO, CommandParameters } from 'lib/cqrs/bus/command/dtos'
import { NewUserCommandPayload } from 'src/user/domain/model/dtos'

import { CREATE_USER } from './constants'

export class CreateUserCommandDTO extends CommandDTO<NewUserCommandPayload> {
  public metadata: ActionMetadata

  constructor(
    public readonly payload: NewUserCommandPayload,
    { previousAction }: Partial<CommandParameters> = {},
  ) {
    super({
      previousAction,
      name: CREATE_USER,
    })
  }
}
