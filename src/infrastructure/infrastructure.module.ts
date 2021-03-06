import { Module } from '@nestjs/common'

import { ProjectionAdapterModule } from './adapters/projection/projection-adapter.module'
import { ORMModule } from './orm/orm.module'

@Module({
  imports: [ORMModule, ProjectionAdapterModule],
})
export class InfrastructureModule {}
