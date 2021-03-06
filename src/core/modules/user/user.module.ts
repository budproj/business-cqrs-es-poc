import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UserAccountProjection } from './projections/user-account.projection'
import { CreateUserCommandHandler } from './use-cases/create-user/create-user.handler'

const UserUseCaseCommandHandlers = [CreateUserCommandHandler]
const UserProjections = [UserAccountProjection]

@Module({
  imports: [CqrsModule],
  providers: [...UserUseCaseCommandHandlers, ...UserProjections],
})
export class UserModule {}
