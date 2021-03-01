import { Module } from '@nestjs/common'

import UserApplicationModule from './application/user-application.module'

@Module({
  imports: [UserApplicationModule],
})
class UserCoreModule {}

export default UserCoreModule
