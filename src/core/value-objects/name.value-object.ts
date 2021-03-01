import { ArgumentInvalidException } from '@core/exceptions/argument-invalid.exception'
import Specification from '@lib/ddd/specification'
import ValueObject, { DomainPrimitive } from '@lib/ddd/value-object'

class HasTwoLettersOrMoreSpecification extends Specification<string> {
  currentRevision = this.rev20210226CheckNumberOfLetters

  public isSatisfiedBy(value: string) {
    return this.currentRevision(value)
  }

  private rev20210226CheckNumberOfLetters(value: string) {
    return value.length >= 2
  }
}

class Name extends ValueObject<string> {
  constructor(value: string) {
    super({ value })
  }

  public get value(): string {
    return this.properties.value
  }

  protected validate({ value }: DomainPrimitive<string>) {
    const hasTwoLettersOrMore = new HasTwoLettersOrMoreSpecification()
    const isValid = hasTwoLettersOrMore.isSatisfiedBy(value)

    if (!isValid) throw new ArgumentInvalidException('The name must have two letters or more')
  }
}

export default Name
