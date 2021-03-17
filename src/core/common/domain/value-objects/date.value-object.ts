import { DomainPrimitive } from '@core/common/domain/primitives'
import { ArgumentInvalidException } from '@core/common/exceptions/argument-invalid.exception'

import { ValueObject } from './base.value-object'

export class DateValueObject extends ValueObject<Date> {
  constructor(value: Date | string | number = Date.now()) {
    super({ value: new Date(value) })
  }

  public get value(): Date {
    return this.properties.value
  }

  public static now(): DateValueObject {
    return new DateValueObject(Date.now())
  }

  protected validate({ value }: DomainPrimitive<Date>): void {
    if (this.isNotValidDate(value)) throw new ArgumentInvalidException('Invalid date format')
  }

  private isNotValidDate(value: Date) {
    return Number.isNaN(value.getTime())
  }
}
