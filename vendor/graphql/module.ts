import { Module } from '@nestjs/common'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'

import UserModule from 'src/user/module'

import graphQLFactory from './factory'

@Module({
  imports: [NestGraphQLModule.forRootAsync(graphQLFactory), UserModule],
})
class GraphQLModule {}

export default GraphQLModule
