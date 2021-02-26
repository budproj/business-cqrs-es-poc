import { Module } from '@nestjs/common'

import UserPresentationModule from './presentation/user-presentation.module'
import UserCoreModule from './core/user-core.module'
import UserInfrastructureModule from './infrastructure/user-infrastructure.module'

@Module({
  imports: [UserPresentationModule, UserCoreModule, UserInfrastructureModule],
  exports: [UserPresentationModule],
})
class UserModule {}

export default UserModule
