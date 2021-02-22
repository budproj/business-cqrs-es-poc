import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { TypeORMConfig, TypeORMPatternConfig } from 'config/typeorm'

@Injectable()
export class TypeORMFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createTypeOrmOptions() {
    const config = this.configService.get<TypeORMConfig>('typeORM')

    return {
      type: config.type as any,
      host: config.endpoint.host,
      port: config.endpoint.port,
      database: config.endpoint.database,
      username: config.authentication.user,
      password: config.authentication.password,
      logging: config.logging.enabled,
      entities: this.buildEntitiesPattern(),
      migrations: this.buildMigrationsPattern(),
      cli: {
        migrationsDir: this.buildMigrationsPattern()[0],
      },
    }
  }

  private buildEntitiesPattern() {
    const patternConfig = this.configService.get<TypeORMPatternConfig>('typeORM.pattern')

    const entityDirectories = patternConfig.directory.entity
    const entityFilePattern = patternConfig.file.entity

    return entityDirectories.map((entityDirectory) => `${entityDirectory}/${entityFilePattern}`)
  }

  private buildMigrationsPattern() {
    const patternConfig = this.configService.get<TypeORMPatternConfig>('typeORM.pattern')

    const migrationDirectories = patternConfig.directory.migration
    const migrationFilePattern = patternConfig.file.migration

    return migrationDirectories.map(
      (migrationDirectory) => `${migrationDirectory}/${migrationFilePattern}`,
    )
  }
}
