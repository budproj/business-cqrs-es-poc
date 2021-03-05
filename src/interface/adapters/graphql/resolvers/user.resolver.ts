import { Logger } from '@nestjs/common'
import { Args, ID, Resolver, Query, Mutation } from '@nestjs/graphql'

import { CreateUserApplicationRequest } from '@core/user/application/requests/create-user.request'
import { UserApplicationService } from '@core/user/application/user-application.service'
import { UserInputGraphQLRequest } from '@interface/adapters/graphql/requests/user.request'
import {
  UserMutationResultGraphQLResponse,
  UserObjectGraphQLResponse,
} from '@interface/adapters/graphql/responses/user.response'

@Resolver(() => UserObjectGraphQLResponse)
export class UserGraphQLResolver {
  private readonly logger = new Logger(UserGraphQLResolver.name)

  constructor(private readonly userService: UserApplicationService) {}

  @Query(() => UserObjectGraphQLResponse, { name: 'user' })
  protected async getUser(
    @Args('userID', { type: () => ID })
    userID: UserObjectGraphQLResponse['id'],
  ) {
    this.logger.log({
      userID,
      message: 'Querying user account',
    })

    console.log(userID)

    return {}
  }

  @Mutation(() => UserMutationResultGraphQLResponse, { name: 'createUser' })
  protected async createUser(
    @Args('user', { type: () => UserInputGraphQLRequest })
    userInputRequest: UserInputGraphQLRequest,
  ) {
    this.logger.log({
      userInputRequest,
      message: 'Creating a new user',
    })

    const createUserRequest = new CreateUserApplicationRequest(userInputRequest)
    const result = this.userService.createUser(createUserRequest)
    console.log(result)

    return {}
  }
}
