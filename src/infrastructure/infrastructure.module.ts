import { Module } from '@nestjs/common'

import { EventStoreAdapterModule } from './adapters/event-store/event-store.module'
import { ProjectionAdapterModule } from './adapters/projection/projection-adapter.module'
import { ORMModule } from './orm/orm.module'

@Module({
  imports: [ORMModule, ProjectionAdapterModule, EventStoreAdapterModule],
  exports: [EventStoreAdapterModule],
})
export class InfrastructureModule {}
