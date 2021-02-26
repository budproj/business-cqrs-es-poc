import { Module } from '@nestjs/common'

import ReadUserAccountGraphQLResolver from './read-user-account.graphql.resolver'

@Module({
  providers: [ReadUserAccountGraphQLResolver],
  exports: [ReadUserAccountGraphQLResolver],
})
class ReadUserAccountModule {}

export default ReadUserAccountModule
