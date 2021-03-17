import { Exception } from './base.exception'
import { EXCEPTION } from './constants'

export class ArgumentNotProvidedException extends Exception {
  public readonly name = EXCEPTION.ARGUMENT_NOT_PROVIDED
}
