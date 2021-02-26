import ReadUserAccountGraphQLResolver from './read-user-account.graphql.resolver'
import { Module } from '@nestjs/common'

@Module({
  providers: [ReadUserAccountGraphQLResolver],
  exports: [ReadUserAccountGraphQLResolver],
})
class ReadUserAccountModule {}

export default ReadUserAccountModule
