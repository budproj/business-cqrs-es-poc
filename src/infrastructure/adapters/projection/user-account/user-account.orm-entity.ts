import { Entity, Column } from 'typeorm'

import { ProjectionEntity } from '@infrastructure/orm/entities/base-projection.entity'

import { USER_ACCOUNT_PROJECTION } from './constants'

@Entity(USER_ACCOUNT_PROJECTION)
export class UserAccountORMEntity extends ProjectionEntity {
  @Column()
  public readonly firstName!: string
}
