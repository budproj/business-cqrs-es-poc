import { Module } from '@nestjs/common'

import UserDomainProjectionHandlers from './handlers'

@Module({
  providers: [...UserDomainProjectionHandlers],
})
class UserDomainProjectionModule {}

export default UserDomainProjectionModule
