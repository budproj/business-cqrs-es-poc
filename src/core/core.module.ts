import { Module } from '@nestjs/common'

import { CoreModulesModule } from './modules/core-modules.module'

@Module({
  imports: [CoreModulesModule],
  exports: [CoreModulesModule],
})
export class CoreModule {}
