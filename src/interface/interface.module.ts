import { Module } from '@nestjs/common'

import GraphQLModule from './graphql/graphql.module'

@Module({
  imports: [GraphQLModule],
})
class InterfaceModule {}

export default InterfaceModule
