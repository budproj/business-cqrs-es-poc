import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { createConfig } from '@config'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'
import { InterfaceModule } from '@interface/interface.module'

@Module({
  imports: [ConfigModule.forFeature(createConfig), InfrastructureModule, InterfaceModule],
})
export class BootstrapModule {}
