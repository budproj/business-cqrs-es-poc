export interface GraphQLConfig {
  debug: GraphQLDebugConfig
  playground: GraphQLPlaygroundConfig
  introspection: GraphQLInstrospectionConfig
  schema: GraphQLSchemaConfig
}

interface GraphQLDebugConfig {
  enabled: boolean
}

interface GraphQLPlaygroundConfig {
  enabled: boolean
}

interface GraphQLInstrospectionConfig {
  enabled: boolean
}

interface GraphQLSchemaConfig {
  filePath: string
}

const {
  GRAPHQL_DEBUG_ENABLED,
  GRAPHQL_PLAYGROUND_ENABLED,
  GRAPHQL_INSTROSPECTION_ENABLED,
  GRAPHQL_SCHEMA_FILE_PATH,
} = process.env

const DEFAULT_DEBUG_ENABLED = false
const DEFAULT_PLAYGROUND_ENABLED = false
const DEFAULT_INSTROSPECTION_ENABLED = false
const DEFAULT_SCHEMA_FILEPATH = './dist/src/infrastructure/graphql/schema.gql'

export const graphQLConfig: GraphQLConfig = {
  debug: {
    enabled: GRAPHQL_DEBUG_ENABLED?.toUpperCase() === 'TRUE' ?? DEFAULT_DEBUG_ENABLED,
  },

  playground: {
    enabled: GRAPHQL_PLAYGROUND_ENABLED?.toUpperCase() === 'TRUE' ?? DEFAULT_PLAYGROUND_ENABLED,
  },

  introspection: {
    enabled:
      GRAPHQL_INSTROSPECTION_ENABLED?.toUpperCase() === 'TRUE' ?? DEFAULT_INSTROSPECTION_ENABLED,
  },

  schema: {
    filePath: GRAPHQL_SCHEMA_FILE_PATH ?? DEFAULT_SCHEMA_FILEPATH,
  },
}

function createGraphQLConfig(): GraphQLConfig {
  return graphQLConfig
}

export default createGraphQLConfig
