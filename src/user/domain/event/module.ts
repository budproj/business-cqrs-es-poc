import { Module } from '@nestjs/common'

import UserDomainEventHandlers from './handlers'
import { UserDomainEventProvider } from './services'

@Module({
  providers: [UserDomainEventProvider, ...UserDomainEventHandlers],
  exports: [UserDomainEventProvider],
})
class UserDomainEventModule {}

export default UserDomainEventModule
