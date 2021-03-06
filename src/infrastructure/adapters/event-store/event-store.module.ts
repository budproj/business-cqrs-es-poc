import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EventStoreAdapterProvider } from './event-store.provider'

@Module({
  imports: [ConfigModule],
  providers: [EventStoreAdapterProvider],
  exports: [EventStoreAdapterProvider],
})
export class EventStoreAdapterModule {}
