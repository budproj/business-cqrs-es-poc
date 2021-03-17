import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EventStoreAdapterProvider } from './event-store.provider'
import { UserAccountProjection } from './projections/user-account.projection'

@Module({
  imports: [ConfigModule],
  providers: [EventStoreAdapterProvider, UserAccountProjection],
  exports: [EventStoreAdapterProvider],
})
export class EventStoreAdapterModule {}
