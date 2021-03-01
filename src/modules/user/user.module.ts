import { Module } from '@nestjs/common'

import UserCoreModule from './core/user-core.module'
import UserUseCasesModule from './use-cases/user-use-cases.module'
import UserInfrastructureModule from './infrastructure/user-infrastructure.module'
import UserPresentationModule from './presentation/user-presentation.module'

@Module({
  imports: [UserPresentationModule, UserUseCasesModule, UserCoreModule, UserInfrastructureModule],
  exports: [UserPresentationModule],
})
class UserModule {}

export default UserModule
