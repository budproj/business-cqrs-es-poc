import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import createConfig from '@config'
import InterfaceModule from './interface/interface.module'
import InfrastructureModule from './infrastructure/infrastructure.module'

@Module({
  imports: [ConfigModule.forFeature(createConfig), InterfaceModule, InfrastructureModule],
})
class BootstrapModule {}

export default BootstrapModule
