import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import UserDomainEventModule from './event/module'
import UserDomainModelModule from './model/module'
import UserDomainProjectionModule from './projection/module'
import { UserDomainService } from './services'

@Module({
  imports: [CqrsModule, UserDomainEventModule, UserDomainModelModule, UserDomainProjectionModule],
  providers: [UserDomainService],
  exports: [UserDomainService],
})
class UserDomainModule {}

export default UserDomainModule
