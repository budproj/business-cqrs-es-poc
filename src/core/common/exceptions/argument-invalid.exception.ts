import { Exception } from './base.exception'
import { EXCEPTION } from './constants'

export class ArgumentInvalidException extends Exception {
  public readonly name = EXCEPTION.ARGUMENT_INVALID
}
