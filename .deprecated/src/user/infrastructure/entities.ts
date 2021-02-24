import { Entity as TypeORMEntity, Column, ObjectIdColumn, ObjectID } from 'typeorm'

import { Entity } from 'lib/orm/entity'

import { USER_REGISTRATION } from './constants'

@TypeORMEntity(USER_REGISTRATION)
export class UserRegistrationEntity extends Entity {
  @ObjectIdColumn()
  public readonly userID: ObjectID

  @Column()
  public readonly firstName: string

  public get schemaVersion() {
    return '1'
  }
}
