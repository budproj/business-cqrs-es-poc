import { Module } from '@nestjs/common'

import UserUseCasesModule from './use-cases/user-use-cases.module'

@Module({
  imports: [UserUseCasesModule],
  exports: [UserUseCasesModule],
})
class UserCoreModule {}

export default UserCoreModule
