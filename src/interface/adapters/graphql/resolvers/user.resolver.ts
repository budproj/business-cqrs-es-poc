import { Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, ID, Resolver, Query, Mutation } from '@nestjs/graphql'

import { CreateUserRequest } from '@core/modules/user/requests/create-user.request'
import { CreateUserCommand } from '@core/ports/primary/create-user.command'
import { UserInputGraphQLRequest } from '@interface/adapters/graphql/requests/user.request'
import {
  UserMutationResultGraphQLResponse,
  UserObjectGraphQLResponse,
} from '@interface/adapters/graphql/responses/user.response'

@Resolver(() => UserObjectGraphQLResponse)
export class UserGraphQLResolver {
  private readonly logger = new Logger(UserGraphQLResolver.name)

  constructor(private readonly commandBus: CommandBus) {}

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

    const createUserRequest = new CreateUserRequest(userInputRequest)
    const commandProperties = { payload: createUserRequest }
    const command = new CreateUserCommand(commandProperties)

    await this.commandBus.execute(command)

    const response = new UserMutationResultGraphQLResponse(command)

    return response
  }
}
