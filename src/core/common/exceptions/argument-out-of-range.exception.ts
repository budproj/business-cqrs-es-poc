import { Exception } from './base.exception'
import { EXCEPTION } from './constants'

export class ArgumentOutOfRangeException extends Exception {
  public readonly name = EXCEPTION.ARGUMENT_OUT_OF_RANGE
}
