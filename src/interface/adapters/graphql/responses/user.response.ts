import { Field, ObjectType } from '@nestjs/graphql'

import {
  EntityObjectGraphQLResponse,
  MutationResultGraphQLResponse,
  ProjectionObjectGraphQLResponse,
} from './base.response'

@ObjectType('UserAccount', {
  implements: () => ProjectionObjectGraphQLResponse,
  description: 'This object contains all account data regarding a given user',
})
export class UserAccountObjectGraphQLResponse extends ProjectionObjectGraphQLResponse {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName!: string
}

@ObjectType('User', {
  implements: () => EntityObjectGraphQLResponse,
  description: 'This object contains all data related to an user account',
})
export class UserObjectGraphQLResponse extends EntityObjectGraphQLResponse {
  @Field(() => UserAccountObjectGraphQLResponse)
  public readonly account!: UserAccountObjectGraphQLResponse
}

@ObjectType('UserMutationResult', {
  implements: () => MutationResultGraphQLResponse,
  description: 'The result data from an user mutation',
})
export class UserMutationResultGraphQLResponse extends MutationResultGraphQLResponse {}
