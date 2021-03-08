import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UserApplicationAggregateFactory } from '@core/modules/user/user-aggregate.factory'
import { CorePortsModule } from '@core/ports/core-ports.module'

import { CreateUserCommandPortHandler } from './use-cases/create-user/create-user.handler'

@Module({
  imports: [CqrsModule, CorePortsModule],
  providers: [UserApplicationAggregateFactory, CreateUserCommandPortHandler],
})
export class UserModule {}
