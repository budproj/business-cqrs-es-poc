import { Field, ID, InterfaceType } from '@nestjs/graphql'

import { Action } from '@infrastructure/bus/action/action'

@InterfaceType('Entity')
export abstract class EntityObjectGraphQLResponse {
  @Field(() => ID, { description: 'The ID of this entity' })
  public readonly id!: string
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
