import { Field, ID, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class EntityObject {
  @Field(() => ID, { description: 'The ID of this entity' })
  public readonly id: string
}
