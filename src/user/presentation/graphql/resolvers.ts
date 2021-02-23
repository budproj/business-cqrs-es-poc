import { Logger } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { GraphQLResolver } from 'lib/presentation/resolvers'
import { CREATE_USER } from 'src/user/application/command/constants'
import { UserApplicationCommandDispatcher } from 'src/user/application/command/services'
import { NewUserCommandPayload } from 'src/user/domain/model/dtos'

import { UserObject, UserInput, UserMutationResult } from './models'

@Resolver(() => UserObject)
export class UserPresentationGraphQLResolvers extends GraphQLResolver {
  private readonly logger = new Logger(UserPresentationGraphQLResolvers.name)

  constructor(private readonly userCommandDispatcher: UserApplicationCommandDispatcher) {
    super()
  }

  @Query(() => [UserObject], { name: 'users' })
  protected async getAllUsers() {
    this.logger.log('Fetching all users')

    return []
  }

  @Mutation(() => UserMutationResult, { name: 'createUser' })
  protected async createUser(
    @Args('user', { type: () => UserInput })
    user: UserInput,
  ) {
    this.logger.log({
      user,
      message: 'Creating a new user',
    })

    const commandResult = await this.userCommandDispatcher.dispatch<NewUserCommandPayload>(
      CREATE_USER,
      user,
    )
    const mutationResult = this.buildMutationResult(commandResult)

    return mutationResult
  }
}
