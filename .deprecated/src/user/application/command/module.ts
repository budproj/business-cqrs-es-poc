import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import UserDomainModule from 'src/user/domain/module'

import UserApplicationCommandHandlers from './handlers'
import { UserApplicationCommandDispatcher } from './services'

@Module({
  imports: [CqrsModule, UserDomainModule],
  providers: [UserApplicationCommandDispatcher, ...UserApplicationCommandHandlers],
  exports: [UserApplicationCommandDispatcher],
})
class UserApplicationCommandModule {}

export default UserApplicationCommandModule
