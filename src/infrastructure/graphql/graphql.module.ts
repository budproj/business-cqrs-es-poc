import { Module } from '@nestjs/common'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'

import graphQLFactory from './config.factory'

@Module({
  imports: [NestGraphQLModule.forRootAsync(graphQLFactory)],
})
class GraphQLModule {}

export default GraphQLModule
