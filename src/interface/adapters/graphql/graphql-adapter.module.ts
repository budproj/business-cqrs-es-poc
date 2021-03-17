import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'

import { CoreModule } from '@core/core.module'

import { GraphQLAdapterFactory } from './graphql-adapter.factory'
import { UserGraphQLResolver } from './resolvers/user.resolver'

@Module({
  imports: [
    NestGraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useClass: GraphQLAdapterFactory,
    }),
    CqrsModule,
    CoreModule,
  ],
  providers: [UserGraphQLResolver],
})
export class GraphQLAdapterModule {}
