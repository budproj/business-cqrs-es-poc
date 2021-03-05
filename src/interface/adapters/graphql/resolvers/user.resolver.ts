import { Logger } from '@nestjs/common'
import { Args, ID, Resolver, Query, Mutation } from '@nestjs/graphql'

import {
  UserInput,
  UserMutationResult,
  UserObject,
} from '@interface/adapters/graphql/dtos/user.dto'

@Resolver(() => UserObject)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name)

  @Query(() => UserObject, { name: 'user' })
  protected async getUser(
    @Args('userID', { type: () => ID })
    userID: UserObject['id'],
  ) {
    this.logger.log({
      userID,
      message: 'Querying user account',
    })

    console.log(userID)

    return {}
  }

  @Mutation(() => UserMutationResult, { name: 'createUser' })
  protected async createUser(
    @Args('user', { type: () => UserInput })
    userInput: UserInput,
  ) {
    this.logger.log({
      userInput,
      message: 'Creating a new user',
    })

    console.log(userInput)

    return {}
  }
}
