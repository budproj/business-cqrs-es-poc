import { EntityObject } from '@interface/adapters/graphql.dto'
import { Logger } from '@nestjs/common'
import { Args, ID, Resolver, Query } from '@nestjs/graphql'

import { UserAccountObject } from './read-user-account.graphql.dto'

@Resolver(() => UserAccountObject)
class ReadUserAccountGraphQLResolver {
  private readonly logger = new Logger(ReadUserAccountGraphQLResolver.name)

  @Query(() => UserAccountObject, { name: 'userAccount' })
  protected async getUserAccount(
    @Args('userID', { type: () => ID })
    userID: EntityObject['id'],
  ) {
    this.logger.log({
      userID,
      message: 'Querying user account',
    })

    console.log(userID)

    return {}
  }
}

export default ReadUserAccountGraphQLResolver
