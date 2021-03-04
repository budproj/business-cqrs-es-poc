import { ArgumentNotProvidedException } from '@core/exceptions/argument-not-provided.exception'
import DomainObject from '@lib/ddd/object'

type Primitives = string | number | boolean
type ValueObjectProperties<T> = T extends Primitives | Date ? DomainPrimitive<T> : T

export interface DomainPrimitive<T = Primitives> {
  value: T
}

interface ValueObjectInterface<T> {
  equals: (candidate: ValueObject<T>) => boolean
  value: T
}

abstract class ValueObject<T> extends DomainObject implements ValueObjectInterface<T> {
  constructor(protected readonly properties: ValueObjectProperties<T>) {
    super()
    this.throwIfEmpty(properties)
    this.validate(properties)
    this.properties = properties
  }

  static isValueObject(candidate: unknown): candidate is ValueObject<unknown> {
    return candidate instanceof ValueObject
  }

  public equals(candidate?: ValueObject<T>): boolean {
    if (candidate === null || candidate === undefined) {
      return false
    }

    return JSON.stringify(this) === JSON.stringify(candidate)
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
      throw new ArgumentNotProvidedException('Property cannot be empty')
  }

  private isDomainPrimitive(object: unknown): object is DomainPrimitive {
    if (Object.prototype.hasOwnProperty.call(object, 'value')) {
      return true
    }

    return false
  }

  protected abstract validate(properties: ValueObjectProperties<T>): void
}

export default ValueObject
