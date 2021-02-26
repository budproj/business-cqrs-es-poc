import UserUseCasesModule from './use-cases/user-use-cases.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserUseCasesModule],
  exports: [UserUseCasesModule],
})
class UserCoreModule {}

export default UserCoreModule
