import { Module } from '@nestjs/common'

import UserApplicationModule from './application/module'
import UserDomainModule from './domain/module'
import UserPresentationModule from './presentation/module'

@Module({
  imports: [UserPresentationModule, UserApplicationModule, UserDomainModule],
  exports: [UserPresentationModule],
})
class UserModule {}

export default UserModule
