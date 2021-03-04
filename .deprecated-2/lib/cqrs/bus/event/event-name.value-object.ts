import { ArgumentInvalidException } from '@core/exceptions/argument-invalid.exception'
import ActionName from '@lib/cqrs/bus/action/action-name.value-object'
import Specification from '@lib/ddd/specifications/base.specification'
import { DomainPrimitive } from '@lib/ddd/value-objects/base.value-object'

import { EVENT_PREFIX } from './constants'

class IsValidEventNameSpecification extends Specification<string> {
  currentRevision = this.rev20210301HasEventPrefix

  public isSatisfiedBy(value: string) {
    return this.currentRevision(value)
  }

  private rev20210301HasEventPrefix(value: string) {
    return value.startsWith(EVENT_PREFIX)
  }
}

class EventName extends ActionName {
  public get value(): string {
    return this.properties.value
  }

  protected validate({ value }: DomainPrimitive<string>) {
    const isValidEventName = new IsValidEventNameSpecification()
    const isValid = isValidEventName.isSatisfiedBy(value)

    if (!isValid) throw new ArgumentInvalidException('The event name is not valid')
  }
}

export default EventName
