import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { CreateUserCommandHandler } from './use-cases/create-user/create-user.handler'
import { UserApplicationService } from './user-application.service'

const UseCaseCommandHandlers = [CreateUserCommandHandler]

@Module({
  imports: [CqrsModule],
  providers: [UserApplicationService, ...UseCaseCommandHandlers],
  exports: [UserApplicationService],
})
export class UserApplicationModule {}
