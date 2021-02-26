import { Field, InputType } from '@nestjs/graphql'

@InputType({ description: 'The required data to create a new user' })
export class CreateUserInput {
  @Field(() => String, { description: 'The first name of the user' })
  public readonly firstName!: string
}
