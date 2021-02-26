import { Module } from '@nestjs/common'

import UserCoreModule from './core/user-core.module'
import UserInfrastructureModule from './infrastructure/user-infrastructure.module'
import UserPresentationModule from './presentation/user-presentation.module'

@Module({
  imports: [UserPresentationModule, UserCoreModule, UserInfrastructureModule],
  exports: [UserPresentationModule],
})
class UserModule {}

export default UserModule
