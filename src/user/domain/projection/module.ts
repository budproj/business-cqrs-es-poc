import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import UserInfrastructureModule from 'src/user/infrastructure/module'

import UserDomainProjectionHandlers from './handlers'
import UserDomainRepositories from './repositories'

@Module({
  imports: [TypeOrmModule.forFeature(UserDomainRepositories), UserInfrastructureModule],
  providers: [...UserDomainProjectionHandlers],
})
class UserDomainProjectionModule {}

export default UserDomainProjectionModule
