import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { createConfig } from '@config'

import { InfrastructureModule } from './infrastructure/infrastructure.module'

@Module({
  imports: [ConfigModule.forFeature(createConfig), InfrastructureModule],
})
export class BootstrapModule {}
