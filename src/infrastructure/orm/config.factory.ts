import { TypeORMConfig } from '@config/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class TypeORMFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createTypeOrmOptions() {
    const config = this.configService.get<TypeORMConfig>('typeORM')

    return {
      type: config?.type as any,
      host: config?.endpoint.host,
      port: config?.endpoint.port,
      database: config?.endpoint.database,
      username: config?.authentication.user,
      password: config?.authentication.password,
      logging: config?.logging.enabled,
      entities: config?.pattern.file.entities,
    }
  }
}
