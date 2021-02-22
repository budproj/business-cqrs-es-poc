import { Module } from '@nestjs/common'

import UserInfrastructureModule from 'src/user/infrastructure/module'

import UserApplicationModule from './application/module'
import UserDomainModule from './domain/module'
import UserPresentationModule from './presentation/module'

@Module({
  imports: [
    UserPresentationModule,
    UserApplicationModule,
    UserDomainModule,
    UserInfrastructureModule,
  ],
  exports: [UserPresentationModule],
})
class UserModule {}

export default UserModule
