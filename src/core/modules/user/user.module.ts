import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { CorePortsModule } from '@core/ports/core-ports.module'

import { CreateUserCommandHandler } from './use-cases/create-user/create-user.handler'

const UserUseCaseCommandHandlers = [CreateUserCommandHandler]

@Module({
  imports: [CqrsModule, CorePortsModule],
  providers: UserUseCaseCommandHandlers,
})
export class UserModule {}
