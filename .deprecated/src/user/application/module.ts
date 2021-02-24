import { Module } from '@nestjs/common'

import { UserApplicationService } from 'src/user/application/services'

import UserApplicationCommandModule from './command/module'
import UserApplicationQueryModule from './query/module'

@Module({
  imports: [UserApplicationCommandModule, UserApplicationQueryModule],
  providers: [UserApplicationService],
  exports: [UserApplicationService],
})
class UserApplicationModule {}

export default UserApplicationModule
