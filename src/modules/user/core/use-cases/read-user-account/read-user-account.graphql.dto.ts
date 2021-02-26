import { Field, ObjectType } from '@nestjs/graphql'

import { EntityObject } from '@interface/adapters/graphql.dto'

@ObjectType({
  implements: () => EntityObject,
  description: 'This object contains all data related to an user account',
})
export class UserAccountObject extends EntityObject {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName!: string
}
