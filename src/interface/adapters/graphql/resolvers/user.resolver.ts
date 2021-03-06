import { Logger } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, ID, Resolver, Query, Mutation, ResolveField, Parent } from '@nestjs/graphql'

import { CreateUserRequest } from '@core/modules/user/requests/create-user.request'
import { ReadUserAccountRequest } from '@core/modules/user/requests/read-user-account.request'
import { CreateUserCommand } from '@core/ports/primary/create-user.command'
import { UserAccountQuery } from '@core/ports/primary/user-account.query'
import { UserInputGraphQLRequest } from '@interface/adapters/graphql/requests/user.request'
import {
  UserAccountObjectGraphQLResponse,
  UserMutationResultGraphQLResponse,
  UserObjectGraphQLResponse,
} from '@interface/adapters/graphql/responses/user.response'

@Resolver(() => UserObjectGraphQLResponse)
export class UserGraphQLResolver {
  private readonly logger = new Logger(UserGraphQLResolver.name)

  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Query(() => UserObjectGraphQLResponse, { name: 'user' })
  protected async getUser(
    @Args('userID', { type: () => ID })
    userID: UserObjectGraphQLResponse['id'],
  ) {
    this.logger.log({
      userID,
      message: 'Querying user data',
    })

    return {
      id: userID,
    }
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

  @ResolveField(() => UserAccountObjectGraphQLResponse, { name: 'account' })
  protected async getUserAccount(@Parent() user: UserObjectGraphQLResponse) {
    this.logger.log({
      user,
      message: 'Querying user account data',
    })

    const selector = { aggregateID: user.id }

    const readUserAccountRequest = new ReadUserAccountRequest(selector)
    const queryProperties = { payload: readUserAccountRequest }
    const query = new UserAccountQuery(queryProperties)

    const queryResult = await this.queryBus.execute(query)

    return queryResult
  }
}
