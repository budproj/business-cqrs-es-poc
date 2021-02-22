import { LOG_LEVEL } from 'lib/logger'

export interface LoggingConfig {
  level: LOG_LEVEL
  serviceName: string
}

const { LOGGING_LEVEL, LOGGING_SERVICE_NAME } = process.env

const DEFAULT_LOGGING_LEVEL = LOG_LEVEL.ERROR
const DEFAULT_LOGGING_SERVICE_NAME = 'business@unknown'

export const loggingConfig: LoggingConfig = {
  level: LOG_LEVEL[LOGGING_LEVEL?.toUpperCase()] ?? DEFAULT_LOGGING_LEVEL,
  serviceName: LOGGING_SERVICE_NAME ?? DEFAULT_LOGGING_SERVICE_NAME,
}

function createLoggingConfig(): LoggingConfig {
  return loggingConfig
}

export default createLoggingConfig
