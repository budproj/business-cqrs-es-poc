import { Field, InputType, ObjectType } from '@nestjs/graphql'

import { EntityObject, MutationResult } from 'lib/models/graphql'

@ObjectType('User', {
  implements: () => EntityObject,
  description:
    'User is an entity that represents a person that have access to our product or relates with other relevant entities',
})
export class UserObject implements EntityObject {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName: string

  public readonly id: string
}

@ObjectType('UserMutationResult', {
  implements: () => MutationResult,
  description:
    'The result of an user mutation. This object give you data to fetch for resulting queries',
})
export class UserMutationResult implements MutationResult {
  public readonly correlationID: string
}

@InputType({ description: 'The required data to create a new user' })
export class UserInput {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName: string
}
