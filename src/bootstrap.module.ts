import createConfig from '@config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import InfrastructureModule from './infrastructure/infrastructure.module'
import InterfaceModule from './interface/interface.module'

@Module({
  imports: [ConfigModule.forFeature(createConfig), InterfaceModule, InfrastructureModule],
})
class BootstrapModule {}

export default BootstrapModule
