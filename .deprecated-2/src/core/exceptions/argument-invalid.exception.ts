import { EXCEPTION } from './constants'
import Exception from './exception'

export class ArgumentInvalidException extends Exception {
  readonly name = EXCEPTION.ARGUMENT_INVALID
}
