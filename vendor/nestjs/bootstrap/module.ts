import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import createConfig from 'config'
import GraphQLModule from 'vendor/graphql/module'

@Module({
  imports: [ConfigModule.forFeature(createConfig), GraphQLModule],
})
class NestJSModule {}

export default NestJSModule
