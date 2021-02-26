import { EXCEPTION } from './constants'
import Exception from './exception'

export class ArgumentNotProvidedException extends Exception {
  readonly name = EXCEPTION.ARGUMENT_NOT_PROVIDED
}
