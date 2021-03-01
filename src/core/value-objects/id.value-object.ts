import { v4 as uuidV4, validate } from 'uuid'

import { ArgumentInvalidException } from '@core/exceptions/argument-invalid.exception'
import ValueObject, { DomainPrimitive } from '@lib/ddd/value-object'

class ID extends ValueObject<string> {
  constructor(value: string) {
    super({ value })
  }

  public get value(): string {
    return this.properties.value
  }

  static generate(): ID {
    return new ID(uuidV4())
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!validate(value)) {
      throw new ArgumentInvalidException('Incorrect ID format')
    }
  }
}

export default ID
