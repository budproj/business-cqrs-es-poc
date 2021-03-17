import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column } from 'typeorm'

export abstract class ProjectionEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string

  @Column('uuid')
  public readonly aggregateID!: string

  @CreateDateColumn()
  public readonly createdAt!: Date

  @UpdateDateColumn()
  public readonly updatedAt!: Date
}
