import { ArgumentInvalidException } from '@core/exceptions/argument-invalid.exception'
import Specification from '@lib/ddd/specifications/base.specification'
import ValueObject, { DomainPrimitive } from '@lib/ddd/value-objects/base.value-object'

class IsValidActionNameSpecification extends Specification<string> {
  currentRevision = this.rev20210301HasThreeDoubleColonBlocks

  public isSatisfiedBy(value: string) {
    return this.currentRevision(value)
  }

  private rev20210301HasThreeDoubleColonBlocks(value: string) {
    const colonBlocks = value.split('::')
    return colonBlocks.length === 3
  }
}

class ActionName extends ValueObject<string> {
  constructor(value: string) {
    super({ value })
  }

  public get value(): string {
    return this.properties.value
  }

  protected validate({ value }: DomainPrimitive<string>) {
    const isValidActionName = new IsValidActionNameSpecification()
    const isValid = isValidActionName.isSatisfiedBy(value)

    if (!isValid) throw new ArgumentInvalidException('The action name is not valid')
  }
}

export default ActionName
