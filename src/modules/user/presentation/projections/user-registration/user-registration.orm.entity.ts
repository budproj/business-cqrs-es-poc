import { Entity, Column } from 'typeorm'

import { ProjectionEntity } from '@infrastructure/orm/projection.entity'

import { USER_REGISTRATION_PROJECTION } from './constants'

@Entity(USER_REGISTRATION_PROJECTION)
export class UserRegistrationEntity extends ProjectionEntity {
  @Column()
  public readonly firstName!: string
}
