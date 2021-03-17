import { DomainObject } from '@core/common/domain/base.object'
import { DateValueObject } from '@core/common/domain/value-objects/date.value-object'
import { ID } from '@core/common/domain/value-objects/id.value-object'
import { ArgumentNotProvidedException } from '@core/common/exceptions/argument-not-provided.exception'
import { ArgumentOutOfRangeException } from '@core/common/exceptions/argument-out-of-range.exception'

export type EntityProperties = {
  id?: ID
  createdAt?: DateValueObject
  updatedAt?: DateValueObject
}

export interface EntityInterface<T extends EntityProperties> {
  id: ID
  createdAt: DateValueObject
  updatedAt: DateValueObject

  equals: (candidate: Entity<T>) => boolean
  unmarshal: () => any
}

export abstract class Entity<T extends EntityProperties = EntityProperties>
  extends DomainObject
  implements EntityInterface<T> {
  public readonly id: ID
  public readonly createdAt: DateValueObject
  public readonly updatedAt: DateValueObject

  constructor(protected readonly properties: T) {
    super()

    this.throwIfEmpty(properties)
    this.validate(properties)

    this.id = properties.id ?? ID.generate()
    this.createdAt = properties.createdAt ?? new DateValueObject()
    this.updatedAt = properties.updatedAt ?? new DateValueObject()
  }

  static isEntity<T extends EntityProperties>(entity: unknown): entity is Entity<T> {
    return entity instanceof Entity
  }

  public equals(candidate?: Entity<T>): boolean {
    if (this === candidate) return true
    if (!Entity.isEntity(candidate)) return false

    return this.id.equals(candidate.id)
  }

  protected validate(properties: T): void {
    const maxProperties = 50

    if (Object.keys(properties).length > maxProperties) {
      throw new ArgumentOutOfRangeException(
        `Entity properties should not have more then ${maxProperties.toString()} properties`,
      )
    }
  }

  private throwIfEmpty(properties: T): void {
    if (this.isEmpty(properties))
      throw new ArgumentNotProvidedException('Entity properties cannot be empty')
  }

  public abstract unmarshal(): any
}
