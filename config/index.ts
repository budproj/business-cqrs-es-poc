import { typeORMConfig, TypeORMConfig } from 'config/typeorm'

import { graphqlConfig, GraphQLConfig } from './graphql'
import { loggingConfig, LoggingConfig } from './logging'
import { serverConfig, ServerConfig } from './server'

export interface Config {
  server: ServerConfig
  logging: LoggingConfig
  graphql: GraphQLConfig
  typeORM: TypeORMConfig
}

const Config: Config = {
  server: serverConfig,
  logging: loggingConfig,
  graphql: graphqlConfig,
  typeORM: typeORMConfig,
}

export function createConfig(): Config {
  return Config
}
