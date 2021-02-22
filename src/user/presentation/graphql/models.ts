import { Directive, Field, ObjectType } from '@nestjs/graphql'

import { EntityObject } from 'lib/models/graphql'

@ObjectType('User', {
  implements: () => EntityObject,
  description:
    'User is an entity that represents a person that have access to our product or relates with other relevant entities',
})
@Directive('@key(fields: "id")')
export class UserObject implements EntityObject {
  @Field({ description: 'The first name of the user' })
  public readonly firstName: string

  public readonly id: string
}
