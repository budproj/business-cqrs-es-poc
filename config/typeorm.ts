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
  user?: string
  password?: string
}

interface TypeORMPatternConfig {
  file: TypeORMFilePatternConfig
}

interface TypeORMFilePatternConfig {
  entities: string[]
}

interface TypeORMLoggingConfig {
  enabled: boolean
}

const {
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_DATABASE,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_ENTITIES,
  TYPEORM_LOGGING,
} = process.env

const DEFAULT_CONNECTION = 'mongodb'
const DEFAULT_DATABASE = 'execution_projections'
const DEFAULT_HOST = 'localhost'
const DEFAULT_PORT = 27017
const DEFAULT_ENTITIES = ['dist/src/**/*.entity.js']

export const typeORMConfig: TypeORMConfig = {
  type: TYPEORM_CONNECTION ?? DEFAULT_CONNECTION,

  endpoint: {
    host: TYPEORM_HOST ?? DEFAULT_HOST,
    port: TYPEORM_PORT ? Number.parseInt(TYPEORM_PORT, 10) : DEFAULT_PORT,
    database: TYPEORM_DATABASE ?? DEFAULT_DATABASE,
  },

  authentication: {
    user: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
  },

  pattern: {
    file: {
      entities: TYPEORM_ENTITIES?.split(',') ?? DEFAULT_ENTITIES,
    },
  },

  logging: {
    enabled: TYPEORM_LOGGING?.toUpperCase() === 'TRUE',
  },
}

function createTypeORMConfig(): TypeORMConfig {
  return typeORMConfig
}

export default createTypeORMConfig
