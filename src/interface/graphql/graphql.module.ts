import UserModule from '@modules/user/user.module'
import { Module } from '@nestjs/common'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'

import graphQLFactory from './config.factory'

@Module({
  imports: [NestGraphQLModule.forRootAsync(graphQLFactory), UserModule],
})
class GraphQLModule {}

export default GraphQLModule
