import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import UserDomainModule from 'src/user/domain/module'

import UserApplicationQueryHandlers from './handlers'
import { UserApplicationQueryDispatcher } from './services'

@Module({
  imports: [CqrsModule, UserDomainModule],
  providers: [UserApplicationQueryDispatcher, ...UserApplicationQueryHandlers],
  exports: [UserApplicationQueryDispatcher],
})
class UserApplicationQueryModule {}

export default UserApplicationQueryModule
