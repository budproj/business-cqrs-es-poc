import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { CreateUserCommandHandler } from './use-cases/create-user/create-user.handler'

const UserUseCaseCommandHandlers = [CreateUserCommandHandler]

@Module({
  imports: [CqrsModule],
  providers: UserUseCaseCommandHandlers,
})
export class UserModule {}
