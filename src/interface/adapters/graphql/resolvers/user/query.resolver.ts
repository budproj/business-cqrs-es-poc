import { Logger } from '@nestjs/common'
import { Args, ID, Resolver, Query } from '@nestjs/graphql'

import { UserObject } from '@interface/adapters/graphql/dtos/user.dto'

@Resolver(() => UserObject)
export class QueryUserResolver {
  private readonly logger = new Logger(QueryUserResolver.name)

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
}
