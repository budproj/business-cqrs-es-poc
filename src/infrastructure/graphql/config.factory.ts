import { ConfigModule, ConfigService } from '@nestjs/config'
import { GqlModuleAsyncOptions } from '@nestjs/graphql'

import createGraphQLConfig from '@config/graphql'

const graphQLFactory: GqlModuleAsyncOptions = {
  imports: [ConfigModule.forFeature(createGraphQLConfig)],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    debug: configService.get('debug.enabled'),
    playground: configService.get('playground.enabled'),
    introspection: configService.get('introspection.enabled'),
    autoSchemaFile: configService.get('schema.filePath'),
    useGlobalPrefix: true,
  }),
}

export default graphQLFactory
