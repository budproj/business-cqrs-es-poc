export type ServerConfig = {
  port: number
  networkAddress: string
  https: ServerHttpsConfig
  cors: ServerCORSConfig
  prefix?: string
}

type ServerHttpsConfig = {
  enabled: boolean
  credentialFilePaths?: ServerHttpsCredentialFilePaths
}

type ServerHttpsCredentialFilePaths = {
  key: string
  cert: string
}

type ServerCORSConfig = {
  credentialsFlag: boolean
  allowedOrigins: string | string[]
}

const {
  SERVER_PORT,
  SERVER_PREFIX,
  SERVER_NETWORK_ADDRESS,
  SERVER_HTTPS_ENABLED,
  SERVER_HTTPS_KEY_FILE_PATH,
  SERVER_HTTPS_CERT_FILE_PATH,
  SERVER_CORS_CREDENTIALS_FLAG,
  SERVER_CORS_ALLOWED_ORIGINS,
} = process.env

const DEFAULT_PORT = 8080
const DEFAULT_NETWORK_ADDRESS = '0.0.0.0'
const DEFAULT_HTTPS_ENABLED = false
const DEFAULT_CORS_CREDENTIALS_FLAG = true
const DEFAULT_CORS_ALLOWED_ORIGINS = ['http://app.local.getbud.co:3000']
const DEFAULT_HTTPS_KEY_FILE_PATH = 'localhost.key'
const DEFAULT_HTTPS_CERT_FILE_PATH = 'localhost.cert'

export const serverConfig: ServerConfig = {
  port: SERVER_PORT ? Number.parseInt(SERVER_PORT, 10) : DEFAULT_PORT,
  prefix: SERVER_PREFIX,
  networkAddress: SERVER_NETWORK_ADDRESS ?? DEFAULT_NETWORK_ADDRESS,

  https: {
    enabled: SERVER_HTTPS_ENABLED?.toUpperCase() === 'TRUE' ?? DEFAULT_HTTPS_ENABLED,
    credentialFilePaths: {
      key: SERVER_HTTPS_KEY_FILE_PATH ?? DEFAULT_HTTPS_KEY_FILE_PATH,
      cert: SERVER_HTTPS_CERT_FILE_PATH ?? DEFAULT_HTTPS_CERT_FILE_PATH,
    },
  },

  cors: {
    credentialsFlag:
      SERVER_CORS_CREDENTIALS_FLAG?.toUpperCase() === 'TRUE' ?? DEFAULT_CORS_CREDENTIALS_FLAG,
    allowedOrigins: SERVER_CORS_ALLOWED_ORIGINS?.split(',') ?? DEFAULT_CORS_ALLOWED_ORIGINS,
  },
}

export function createServerConfig(): ServerConfig {
  return serverConfig
}
