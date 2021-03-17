import { Module } from '@nestjs/common'

import { InfrastructureModule } from '@infrastructure/infrastructure.module'

import { EventStorePort } from './secondary/event-store.port'

@Module({
  imports: [InfrastructureModule],
  providers: [EventStorePort],
  exports: [EventStorePort],
})
export class CorePortsModule {}
