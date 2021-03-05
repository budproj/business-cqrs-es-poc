import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'

import { UserModule } from '@core/user/user.module'

import { GraphQLAdapterFactory } from './graphql-adapter.factory'
import { UserGraphQLResolver } from './resolvers/user.resolver'

@Module({
  imports: [
    NestGraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useClass: GraphQLAdapterFactory,
    }),
    UserModule,
  ],
  providers: [UserGraphQLResolver],
})
export class GraphQLAdapterModule {}
