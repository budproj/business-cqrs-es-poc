interface SpecificationInterface<T> {
  currentRevision?: (candidate: T) => boolean

  isSatisfiedBy(candidate: T): boolean
  and(other: SpecificationInterface<T>): SpecificationInterface<T>
  not(): SpecificationInterface<T>
}

export abstract class Specification<T> implements SpecificationInterface<T> {
  public and(other: SpecificationInterface<T>): SpecificationInterface<T> {
    return new AndSpecification<T>(this, other)
  }

  public not(): SpecificationInterface<T> {
    return new NotSpecification<T>(this)
  }

  public abstract isSatisfiedBy(candidate: T): boolean
}

class AndSpecification<T> extends Specification<T> {
  private readonly one: SpecificationInterface<T>
  private readonly other: SpecificationInterface<T>

  public constructor(one: SpecificationInterface<T>, other: SpecificationInterface<T>) {
    super()
    this.one = one
    this.other = other
  }

  public isSatisfiedBy(candidate: T) {
    return this.one.isSatisfiedBy(candidate) && this.other.isSatisfiedBy(candidate)
  }
}

class NotSpecification<T> extends Specification<T> {
  private readonly wrapped: SpecificationInterface<T>

  public constructor(wrapped: SpecificationInterface<T>) {
    super()
    this.wrapped = wrapped
  }

  public isSatisfiedBy(candidate: T) {
    return !this.wrapped.isSatisfiedBy(candidate)
  }
}
