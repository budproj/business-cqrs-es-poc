import { Module } from '@nestjs/common'

import { CoreModulesModule } from './modules/core-modules.module'
import { CorePortsModule } from './ports/core-ports.module'

@Module({
  imports: [CoreModulesModule, CorePortsModule],
  exports: [CoreModulesModule],
})
export class CoreModule {}
