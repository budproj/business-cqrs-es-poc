import { ArgumentInvalidException } from '@core/exceptions/argument-invalid.exception'
import Specification from '@lib/ddd/specifications/base.specification'
import ValueObject, { DomainPrimitive } from '@lib/ddd/value-objects/base.value-object'

class IsValidNameSpecification extends Specification<string> {
  currentRevision = this.rev20210226HasTwoLettersOrMore

  public isSatisfiedBy(value: string) {
    return this.currentRevision(value)
  }

  private rev20210226HasTwoLettersOrMore(value: string) {
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
    const isValidName = new IsValidNameSpecification()
    const isValid = isValidName.isSatisfiedBy(value)

    if (!isValid) throw new ArgumentInvalidException('The name is not valid')
  }
}

export default Name
