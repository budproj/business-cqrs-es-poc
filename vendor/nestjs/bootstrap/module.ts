import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import createConfig from 'config'
import GraphQLModule from 'vendor/graphql/module'
import TypeORMModule from 'vendor/typeorm/module'

@Module({
  imports: [ConfigModule.forFeature(createConfig), TypeORMModule, GraphQLModule],
})
class NestJSModule {}

export default NestJSModule
