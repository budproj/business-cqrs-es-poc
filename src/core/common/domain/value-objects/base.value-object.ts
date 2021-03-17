import { DomainObject } from '@core/common/domain/base.object'
import { DomainPrimitive, Primitives } from '@core/common/domain/primitives'
import { ArgumentNotProvidedException } from '@core/common/exceptions/argument-not-provided.exception'

type ValueObjectProperties<T> = T extends Primitives | Date ? DomainPrimitive<T> : T

interface ValueObjectInterface<T> {
  value: T

  equals: (candidate: ValueObject<T>) => boolean
  unmarshal: () => T
}

export abstract class ValueObject<T> extends DomainObject implements ValueObjectInterface<T> {
  constructor(protected readonly properties: ValueObjectProperties<T>) {
    super()

    this.throwIfEmpty(properties)
    this.validate(properties)
    this.properties = properties
  }

  static isValueObject(candidate: unknown): candidate is ValueObject<unknown> {
    return candidate instanceof ValueObject
  }

  public equals(candidate: ValueObject<T>): boolean {
    return JSON.stringify(this) === JSON.stringify(candidate)
  }

  public unmarshal() {
    return this.value
  }

  public abstract get value(): T

  protected lengthIsBetween(value: number | string | unknown[], min: number, max: number): boolean {
    if (this.isEmpty(value)) {
      throw new Error('Cannot check length of a value. Provided value is empty')
    }

    const valueLength = typeof value === 'number' ? Number(value).toString().length : value.length
    if (valueLength >= min && valueLength <= max) {
      return true
    }

    return false
  }

  private throwIfEmpty(properties: ValueObjectProperties<T>): void {
    const isEmpty = this.isEmpty(properties)
    const isPrimitiveAndEmpty = isEmpty && this.isDomainPrimitive(properties)

    if (isEmpty || isPrimitiveAndEmpty)
      throw new ArgumentNotProvidedException('Value Object properties cannot be empty')
  }

  private isDomainPrimitive(object: unknown): object is DomainPrimitive {
    if (Object.prototype.hasOwnProperty.call(object, 'value')) {
      return true
    }

    return false
  }

  protected abstract validate(properties: ValueObjectProperties<T>): void
}
