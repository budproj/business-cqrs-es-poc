import { Module } from '@nestjs/common'

import UserUseCasesModule from '@modules/user/use-cases/user-use-cases.module'

@Module({
  imports: [UserUseCasesModule],
  exports: [UserUseCasesModule],
})
class UserPresentationModule {}

export default UserPresentationModule
