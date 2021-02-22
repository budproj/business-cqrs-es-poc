import { typeORMConfig, TypeORMConfig } from 'config/typeorm'

import { graphQLConfig, GraphQLConfig } from './graphql'
import { loggingConfig, LoggingConfig } from './logging'
import { serverConfig, ServerConfig } from './server'

export interface Config {
  server: ServerConfig
  logging: LoggingConfig
  graphQL: GraphQLConfig
  typeORM: TypeORMConfig
}

const Config: Config = {
  server: serverConfig,
  logging: loggingConfig,
  graphQL: graphQLConfig,
  typeORM: typeORMConfig,
}

function createConfig(): Config {
  return Config
}

export default createConfig
