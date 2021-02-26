import ValueObject, { DomainPrimitive } from './value-object'

class Name extends ValueObject<string> {
  constructor(value: string) {
    super({ value })
  }

  public get value(): string {
    return this.properties.value
  }

  protected validate({ value }: DomainPrimitive<string>) {
    if (!value) throw new Error('Invalid')
  }
}

export default Name
