import { DomainPrimitive } from '@core/common/domain/primitives'
import { Specification } from '@core/common/domain/specifications/base.specification'
import { ValueObject } from '@core/common/domain/value-objects/base.value-object'
import { ArgumentInvalidException } from '@core/common/exceptions/argument-invalid.exception'

export class UserFirstName extends ValueObject<string> {
  constructor(value: string) {
    super({ value })
  }

  public get value(): string {
    return this.properties.value
  }

  protected validate({ value }: DomainPrimitive<string>) {
    const isValidName = new IsValidUserFirstNameSpecification()
    const isValid = isValidName.isSatisfiedBy(value)

    if (!isValid) throw new ArgumentInvalidException('The first name is not valid')
  }
}

class IsValidUserFirstNameSpecification extends Specification<string> {
  currentRevision = this.rev20210226HasTwoLettersOrMore

  public isSatisfiedBy(value: string) {
    return this.currentRevision(value)
  }

  private rev20210226HasTwoLettersOrMore(value: string) {
    return value.length >= 2
  }
}
