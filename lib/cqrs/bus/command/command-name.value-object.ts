import { ArgumentInvalidException } from '@core/exceptions/argument-invalid.exception'
import ActionName from '@lib/cqrs/bus/action/action-name.value-object'
import Specification from '@lib/ddd/specifications/base.specification'
import { DomainPrimitive } from '@lib/ddd/value-objects/base.value-object'

import { COMMAND_PREFIX } from './constants'

class IsValidCommandNameSpecification extends Specification<string> {
  currentRevision = this.rev20210301HasCommandPrefix

  public isSatisfiedBy(value: string) {
    return this.currentRevision(value)
  }

  private rev20210301HasCommandPrefix(value: string) {
    return value.startsWith(COMMAND_PREFIX)
  }
}

class CommandName extends ActionName {
  public get value(): string {
    return this.properties.value
  }

  protected validate({ value }: DomainPrimitive<string>) {
    const isValidCommandName = new IsValidCommandNameSpecification()
    const isValid = isValidCommandName.isSatisfiedBy(value)

    if (!isValid) throw new ArgumentInvalidException('The command name is not valid')
  }
}

export default CommandName
