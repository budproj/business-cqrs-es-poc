import { existsSync, readFileSync } from 'fs'

import { LoggerService, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import createApplicationConfig from 'config'
import { LoggingConfig } from 'config/logging'
import { ServerConfig } from 'config/server'
import buildLogger from 'lib/logger'

import BootstrapModule from './module'

interface CustomFastifyServerOptions {
  https: CustomFastifyServerHTTPSOptions | undefined
}

interface CustomFastifyServerHTTPSOptions {
  key: Buffer
  cert: Buffer
}

async function bootstrap(): Promise<void> {
  const serverConfig = createApplicationConfig().server
  const fastifyServerOptions = buildFastifyServerOptions(serverConfig)

  const application = await NestFactory.create<NestFastifyApplication>(
    BootstrapModule,
    new FastifyAdapter(fastifyServerOptions),
  )

  const configService = application.get<ConfigService>(ConfigService)
  const loggingConfig = configService.get<LoggingConfig>('logging')

  const logger = buildLogger(loggingConfig.level, loggingConfig.serviceName)

  setupServer(application, logger, serverConfig)
  await launchServer(application, logger, serverConfig)
}

function buildFastifyServerOptions(serverConfig: ServerConfig): CustomFastifyServerOptions {
  const httpsConfig = buildHttpsConfig(serverConfig)

  return {
    https: httpsConfig,
  }
}

function buildHttpsConfig({ https }: ServerConfig): CustomFastifyServerHTTPSOptions | undefined {
  const isHttpsEnabled = https.enabled
  if (!isHttpsEnabled) return

  const hasValidCredentials =
    existsSync(https.credentialFilePaths.key) && existsSync(https.credentialFilePaths.cert)
  if (!hasValidCredentials) return

  return {
    key: readFileSync(https.credentialFilePaths.key),
    cert: readFileSync(https.credentialFilePaths.cert),
  }
}

function setupServer(
  application: NestFastifyApplication,
  logger: LoggerService,
  serverConfig: ServerConfig,
): void {
  application.setGlobalPrefix(serverConfig.prefix)
  application.useLogger(logger)
  application.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  application.enableCors({
    credentials: serverConfig.cors.credentialsFlag,
    origin: serverConfig.cors.allowedOrigins,
  })
}

async function launchServer(
  application: NestFastifyApplication,
  logger: LoggerService,
  serverConfig: ServerConfig,
): Promise<void> {
  await application.listen(serverConfig.port, serverConfig.networkAddress)
  logger.log(`Started server listening to port ${serverConfig.port.toString()}`)
}

export default bootstrap
