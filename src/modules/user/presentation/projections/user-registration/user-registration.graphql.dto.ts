import { Field, ObjectType } from '@nestjs/graphql'
import { EntityObject } from '@interface/adapters/graphql.dto'

@ObjectType('UserRegistration', {
  implements: () => EntityObject,
  description: 'This object contains user registration data for a given user',
})
export class UserRegistrationObject implements EntityObject {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName!: string

  public readonly id!: string
}
