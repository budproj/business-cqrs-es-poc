import { Module } from '@nestjs/common'

import UserCoreModule from './core/user-core.module'
import UserPresentationModule from './presentation/user-presentation.module'
import UserUseCasesModule from './use-cases/user-use-cases.module'

@Module({
  imports: [UserPresentationModule, UserUseCasesModule, UserCoreModule],
  exports: [UserPresentationModule],
})
class UserModule {}

export default UserModule
