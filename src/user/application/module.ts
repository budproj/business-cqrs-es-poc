import { Module } from '@nestjs/common'

import UserApplicationCommandModule from './command/module'

@Module({
  imports: [UserApplicationCommandModule],
  exports: [UserApplicationCommandModule],
})
class UserApplicationModule {}

export default UserApplicationModule
