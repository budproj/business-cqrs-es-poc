import { Module } from '@nestjs/common'

import { UserDomainEventProvider } from './services'

@Module({
  providers: [UserDomainEventProvider],
  exports: [UserDomainEventProvider],
})
class UserDomainEventModule {}

export default UserDomainEventModule
