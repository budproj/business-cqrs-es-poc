import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import createConfig from '@config'
import GraphQLModule from './infrastructure/graphql/graphql.module'
import TypeORMModule from './infrastructure/orm/orm.module'

@Module({
  imports: [ConfigModule.forFeature(createConfig), TypeORMModule, GraphQLModule],
})
class BootstrapModule {}

export default BootstrapModule
