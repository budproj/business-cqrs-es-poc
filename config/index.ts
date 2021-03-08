import { typeormConfig, TypeORMConfig } from 'config/typeorm'

import { eventStoreConfig, EventStoreConfig } from './event-store'
import { graphqlConfig, GraphQLConfig } from './graphql'
import { loggingConfig, LoggingConfig } from './logging'
import { serverConfig, ServerConfig } from './server'

export type Config = {
  server: ServerConfig
  logging: LoggingConfig
  graphql: GraphQLConfig
  typeorm: TypeORMConfig
  eventStore: EventStoreConfig
}

const Config: Config = {
  server: serverConfig,
  logging: loggingConfig,
  graphql: graphqlConfig,
  typeorm: typeormConfig,
  eventStore: eventStoreConfig,
}

export function createConfig(): Config {
  return Config
}
