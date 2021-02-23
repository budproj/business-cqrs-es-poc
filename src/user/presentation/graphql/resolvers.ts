import { Logger } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { UserApplicationService } from 'src/user/application/services'

import { UserObject, UserInput, UserMutationResult } from './models'

@Resolver(() => UserObject)
export class UserPresentationGraphQLResolvers {
  private readonly logger = new Logger(UserPresentationGraphQLResolvers.name)

  constructor(private readonly applicationService: UserApplicationService) {}

  @Query(() => [UserObject], { name: 'users' })
  protected async getAllUsersRegistration() {
    this.logger.log('Fetching all users registration')

    const result = await this.applicationService.getAllUsersRegistration()

    return result
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

    const result = await this.applicationService.createUser(user)

    return result
  }
}
