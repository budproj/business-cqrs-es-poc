import { Field, InputType, ObjectType } from '@nestjs/graphql'

import { EntityObject, MutationResult } from './base.dto'

@ObjectType({
  implements: () => EntityObject,
  description: 'This object contains all data related to an user account',
})
export class UserObject extends EntityObject {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName!: string
}

@ObjectType({
  implements: () => MutationResult,
  description: 'The result data from an user mutation',
})
export class UserMutationResult extends MutationResult {
  public readonly correlationID!: string
}

@InputType({
  description:
    'Relevant input data to mutate a User object. We can use this data to create or update a given user',
})
export class UserInput {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName!: string
}
