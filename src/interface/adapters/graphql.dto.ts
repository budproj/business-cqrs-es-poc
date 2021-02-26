import { Field, ID, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class EntityObject {
  @Field(() => ID, { description: 'The ID of this entity' })
  public readonly id!: string
}

@InterfaceType()
export abstract class MutationResult {
  @Field(() => ID, {
    description:
      'The correlation ID generated for this mutation. You can use it to query the result',
  })
  public readonly correlationID!: string
}
