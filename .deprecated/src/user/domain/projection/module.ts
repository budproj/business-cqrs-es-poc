import { Module } from '@nestjs/common'

import UserInfrastructureModule from 'src/user/infrastructure/module'

import UserDomainProjectionHandlers from './handlers'

@Module({
  imports: [UserInfrastructureModule],
  providers: [...UserDomainProjectionHandlers],
})
class UserDomainProjectionModule {}

export default UserDomainProjectionModule
