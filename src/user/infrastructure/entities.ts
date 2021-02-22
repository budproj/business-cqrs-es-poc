import { Entity as TypeORMEntity, Column } from 'typeorm'

import { Entity } from 'lib/orm/entity'

import { USER_NEW_ENTITY } from './constants'

@TypeORMEntity(USER_NEW_ENTITY)
export class NewUserEntity extends Entity {
  @Column()
  public readonly firstName: string

  public get schemaVersion() {
    return '1'
  }
}
