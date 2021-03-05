import { Module } from '@nestjs/common'

import { GraphQLAdapterModule } from './adapters/graphql/graphql-adapter.module'

@Module({
  imports: [GraphQLAdapterModule],
})
export class InterfaceModule {}
