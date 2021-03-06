import { Field, ID, InterfaceType } from '@nestjs/graphql'

import { Action } from '@infrastructure/bus/action/action'

@InterfaceType('Entity')
export abstract class EntityObjectGraphQLResponse {
  @Field(() => ID, { description: 'The ID of this entity' })
  public readonly id!: string
}

@InterfaceType('Projection')
export abstract class ProjectionObjectGraphQLResponse {
  @Field(() => ID, { description: 'The ID of this projection' })
  public readonly id!: string

  @Field(() => ID, { description: 'The aggregate ID of this projection' })
  public readonly aggregateID!: string
}

@InterfaceType('MutationResult')
export abstract class MutationResultGraphQLResponse {
  @Field(() => ID, {
    description:
      'The correlation ID generated for this mutation. You can use it to query the result',
  })
  public readonly correlationID!: string

  constructor({ tracing }: Action) {
    this.correlationID = tracing.correlationID
  }
}
