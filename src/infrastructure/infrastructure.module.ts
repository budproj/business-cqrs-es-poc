import { Module } from '@nestjs/common'

import { ORMModule } from './orm/orm.module'

@Module({
  imports: [ORMModule],
})
export class InfrastructureModule {}
