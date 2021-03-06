import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { TypeORMConfig } from '@config/typeorm'

@Injectable()
export class TypeORMFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  static buildTypeORMConnectionConfig(config?: TypeORMConfig) {
    return {
      type: config?.type as any,
      host: config?.endpoint.host,
      port: config?.endpoint.port,
      database: config?.endpoint.database,
      username: config?.authentication.user,
      password: config?.authentication.password,
      namingStrategy: config?.convention.naming,
      logging: config?.logging.enabled,
      entities: config?.pattern.file.entities,
      migrations: config?.pattern.file.migrations,
      cli: {
        migrationsDir: config?.pattern.directory.migrations,
      },
    }
  }

  public createTypeOrmOptions() {
    const config = this.configService.get<TypeORMConfig>('typeorm')
    const connectionConfig = TypeORMFactory.buildTypeORMConnectionConfig(config)

    return connectionConfig
  }
}
