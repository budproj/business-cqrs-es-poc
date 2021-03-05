import { Field, InputType } from '@nestjs/graphql'

@InputType({
  description:
    'Relevant input data to mutate a User object. We can use this data to create or update a given user',
})
export class UserInputGraphQLRequest {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName!: string
}
