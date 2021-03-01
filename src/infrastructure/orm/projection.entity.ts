import { ObjectID, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class ProjectionEntity {
  @ObjectIdColumn()
  public readonly id!: ObjectID

  @ObjectIdColumn()
  public readonly aggregateID!: ObjectID

  @CreateDateColumn({ name: 'createdAt' })
  public readonly createdAt!: Date

  @UpdateDateColumn({ name: 'updatedAt' })
  public readonly updatedAt!: Date

  public get schemaVersion() {
    return '1'
  }
}
