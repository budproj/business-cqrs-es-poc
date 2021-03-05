import { Field, ObjectType } from '@nestjs/graphql'

import { EntityObjectGraphQLResponse, MutationResultGraphQLResponse } from './base.response'

@ObjectType('User', {
  implements: () => EntityObjectGraphQLResponse,
  description: 'This object contains all data related to an user account',
})
export class UserObjectGraphQLResponse extends EntityObjectGraphQLResponse {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName!: string
}

@ObjectType('UserMutationResult', {
  implements: () => MutationResultGraphQLResponse,
  description: 'The result data from an user mutation',
})
export class UserMutationResultGraphQLResponse extends MutationResultGraphQLResponse {
  public readonly correlationID!: string
}
