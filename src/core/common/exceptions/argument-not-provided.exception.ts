import { Exception } from './base.exception'
import { EXCEPTION } from './constants'

export class ArgumentNotProvidedException extends Exception {
  readonly name = EXCEPTION.ARGUMENT_NOT_PROVIDED
}
