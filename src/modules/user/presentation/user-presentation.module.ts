import UserCoreModule from '@modules/user/core/user-core.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserCoreModule],
  exports: [UserCoreModule],
})
class UserPresentationModule {}

export default UserPresentationModule
