import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { createConfig } from '@config'

import { CoreModule } from './core/core.module'
import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { InterfaceModule } from './interface/interface.module'

@Module({
  imports: [
    ConfigModule.forFeature(createConfig),
    InfrastructureModule,
    InterfaceModule,
    CoreModule,
  ],
})
export class BootstrapModule {}
