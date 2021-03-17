import { NamingStrategyInterface } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export type TypeORMConfig = {
  type: string
  endpoint: TypeORMEndpointConfig
  authentication: TypeORMAuthenticationConfig
  pattern: TypeORMPatternConfig
  logging: TypeORMLoggingConfig
  convention: TypeORMConventionConfig
}

type TypeORMEndpointConfig = {
  host: string
  port: number
  database: string
}

type TypeORMAuthenticationConfig = {
  user?: string
  password?: string
}

type TypeORMPatternConfig = {
  file: TypeORMFilePatternConfig
  directory: TypeORMDirectoryPatternConfig
}

type TypeORMFilePatternConfig = {
  entities: string[]
  migrations: string[]
}

type TypeORMDirectoryPatternConfig = {
  migrations: string
}

type TypeORMLoggingConfig = {
  enabled: boolean
}

type TypeORMConventionConfig = {
  naming?: NamingStrategyInterface
}

const {
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_DATABASE,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_ENTITIES,
  TYPEORM_MIGRATIONS,
  TYPEORM_MIGRATIONS_DIR,
  TYPEORM_LOGGING,
  TYPEORM_CONVENTION_NAMING_FLAG,
} = process.env

const DEFAULT_CONNECTION = 'postgres'
const DEFAULT_DATABASE = 'execution_projections'
const DEFAULT_HOST = 'localhost'
const DEFAULT_PORT = 5432
const DEFAULT_USERNAME = 'postgres'
const DEFAULT_PASSWORD = 'changeme'
const DEFAULT_ENTITIES = ['dist/src/**/*.orm-entity.js']
const DEFAULT_MIGRATIONS = ['dist/src/infrastructure/orm/migrations/*.js']
const DEFAULT_MIGRATIONS_DIR = 'src/infrastructure/orm/migrations'

const CONVENTION_NAMING_FLAG = TYPEORM_CONVENTION_NAMING_FLAG?.toUpperCase() !== 'FALSE'

export const typeormConfig: TypeORMConfig = {
  type: TYPEORM_CONNECTION ?? DEFAULT_CONNECTION,

  endpoint: {
    host: TYPEORM_HOST ?? DEFAULT_HOST,
    port: TYPEORM_PORT ? Number.parseInt(TYPEORM_PORT, 10) : DEFAULT_PORT,
    database: TYPEORM_DATABASE ?? DEFAULT_DATABASE,
  },

  authentication: {
    user: TYPEORM_USERNAME ?? DEFAULT_USERNAME,
    password: TYPEORM_PASSWORD ?? DEFAULT_PASSWORD,
  },

  pattern: {
    file: {
      entities: TYPEORM_ENTITIES?.split(',') ?? DEFAULT_ENTITIES,
      migrations: TYPEORM_MIGRATIONS?.split(',') ?? DEFAULT_MIGRATIONS,
    },

    directory: {
      migrations: TYPEORM_MIGRATIONS_DIR ?? DEFAULT_MIGRATIONS_DIR,
    },
  },

  logging: {
    enabled: TYPEORM_LOGGING?.toUpperCase() === 'TRUE',
  },

  convention: {
    naming: CONVENTION_NAMING_FLAG ? new SnakeNamingStrategy() : undefined,
  },
}

export function createTypeORMConfig(): TypeORMConfig {
  return typeormConfig
}
