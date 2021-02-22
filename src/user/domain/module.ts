import { Module } from '@nestjs/common'

import UserDomainEventModule from './event/module'
import UserDomainModelModule from './model/module'
import UserDomainProjectionModule from './projection/module'

@Module({
  imports: [UserDomainEventModule, UserDomainModelModule, UserDomainProjectionModule],
  exports: [UserDomainEventModule],
})
class UserDomainModule {}

export default UserDomainModule
