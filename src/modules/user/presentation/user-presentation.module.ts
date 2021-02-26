import { Module } from '@nestjs/common'

import UserCoreModule from '@modules/user/core/user-core.module'

@Module({
  imports: [UserCoreModule],
  exports: [UserCoreModule],
})
class UserPresentationModule {}

export default UserPresentationModule
