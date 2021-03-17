import { ActionMetadata } from '@infrastructure/bus/action/metadata'

import { Exception } from './base.exception'
import { EXCEPTION } from './constants'

export class InvalidCommandException extends Exception {
  public readonly name = EXCEPTION.INVALID_COMMAND

  constructor(public readonly message: string, public readonly commandMetadata: ActionMetadata) {
    super(message, { ...commandMetadata })
  }
}
