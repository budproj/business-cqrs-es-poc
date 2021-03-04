import { Module } from '@nestjs/common'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'

import UserModule from '@modules/user/user.module'

import graphQLFactory from './config.factory'

@Module({
  imports: [NestGraphQLModule.forRootAsync(graphQLFactory), UserModule],
})
class GraphQLModule {}

export default GraphQLModule
