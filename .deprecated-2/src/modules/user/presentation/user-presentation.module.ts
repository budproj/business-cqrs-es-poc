import { Module } from '@nestjs/common'

import UserUseCasesModule from '@modules/user/use-cases/user-use-cases.module'

import UserProjectionsModule from './projections/user-projections.module'

@Module({
  imports: [UserProjectionsModule, UserUseCasesModule],
  exports: [UserUseCasesModule],
})
class UserPresentationModule {}

export default UserPresentationModule
