import { Module } from '@nestjs/common'

import { QueryUserResolver } from '@interface/adapters/graphql/resolvers/user/query.resolver'

import { GraphQLAdapterModule } from './adapters/graphql/graphql-adapter.module'

@Module({
  imports: [GraphQLAdapterModule],
  providers: [QueryUserResolver],
})
export class InterfaceModule {}
