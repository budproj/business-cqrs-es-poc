import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { CreateUserCommandHandler } from './use-cases/create-user/create-user.handler'

const UseCaseCommandHandlers = [CreateUserCommandHandler]

@Module({
  imports: [CqrsModule],
  providers: UseCaseCommandHandlers,
})
export class UserModule {}
