export interface TypeORMConfig {
  type: string
  endpoint: TypeORMEndpointConfig
  authentication: TypeORMAuthenticationConfig
  pattern: TypeORMPatternConfig
  logging: TypeORMLoggingConfig
}

interface TypeORMEndpointConfig {
  host: string
  port: number
  database: string
}

interface TypeORMAuthenticationConfig {
  user: string
  password: string
}

export interface TypeORMPatternConfig {
  directory: TypeORMDirectoryPatternConfig
  file: TypeORMFilePatternConfig
}

interface TypeORMDirectoryPatternConfig {
  entity: string[]
  migration: string[]
}

interface TypeORMFilePatternConfig {
  entity: string
  migration: string
}

interface TypeORMLoggingConfig {
  enabled: boolean
}

const {
  TYPEORM_TYPE,
  TYPEORM_ENDPOINT_HOST,
  TYPEORM_ENDPOINT_PORT,
  TYPEORM_ENDPOINT_DATABASE,
  TYPEORM_AUTHENTICATION_USER,
  TYPEORM_AUTHENTICATION_PASSWORD,
  TYPEORM_PATTERN_DIRECTORY_ENTITY,
  TYPEORM_PATTERN_DIRECTORY_MIGRATION,
  TYPEORM_PATTERN_FILE_ENTITY,
  TYPEORM_PATTERN_FILE_MIGRATION,
  TYPEORM_LOGGING_ENABLED,
} = process.env

const DEFAULT_TYPE = 'mongodb'
const DEFAULT_ENDPOINT_HOST = 'localhost'
const DEFAULT_ENDPOINT_PORT = 27017
const DEFAULT_PATTERN_DIRECTORY_ENTITY = ['dist/src/**']
const DEFAULT_PATTERN_DIRECTORY_MIGRATION = ['dist/vendor/typeorm/migrations']
const DEFAULT_PATTERN_FILE_ENTITY = 'entities.js'
const DEFAULT_PATTERN_FILE_MIGRATION = '*.js'

export const typeORMConfig: TypeORMConfig = {
  type: TYPEORM_TYPE ?? DEFAULT_TYPE,

  endpoint: {
    host: TYPEORM_ENDPOINT_HOST ?? DEFAULT_ENDPOINT_HOST,
    port: Number.parseInt(TYPEORM_ENDPOINT_PORT, 10) ?? DEFAULT_ENDPOINT_PORT,
    database: TYPEORM_ENDPOINT_DATABASE,
  },

  authentication: {
    user: TYPEORM_AUTHENTICATION_USER,
    password: TYPEORM_AUTHENTICATION_PASSWORD,
  },

  pattern: {
    directory: {
      entity: TYPEORM_PATTERN_DIRECTORY_ENTITY?.split(',') ?? DEFAULT_PATTERN_DIRECTORY_ENTITY,
      migration:
        TYPEORM_PATTERN_DIRECTORY_MIGRATION?.split(',') ?? DEFAULT_PATTERN_DIRECTORY_MIGRATION,
    },

    file: {
      entity: TYPEORM_PATTERN_FILE_ENTITY ?? DEFAULT_PATTERN_FILE_ENTITY,
      migration: TYPEORM_PATTERN_FILE_MIGRATION ?? DEFAULT_PATTERN_FILE_MIGRATION,
    },
  },

  logging: {
    enabled: TYPEORM_LOGGING_ENABLED.toUpperCase() === 'TRUE',
  },
}

function createTypeORMConfig(): TypeORMConfig {
  return typeORMConfig
}

export default createTypeORMConfig
