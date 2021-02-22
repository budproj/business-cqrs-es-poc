import { Module } from '@nestjs/common'

import UserDomainEventModule from './event/module'
import UserDomainModelModule from './model/module'

@Module({
  imports: [UserDomainEventModule, UserDomainModelModule],
  exports: [UserDomainEventModule],
})
class UserDomainModule {}

export default UserDomainModule
