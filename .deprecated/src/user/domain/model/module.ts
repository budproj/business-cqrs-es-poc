import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import UserDomainEventModule from 'src/user/domain/event/module'
import {
  UserReadRegistrationModelService,
  UserReadServiceProvider,
  UserWriteModelService,
} from 'src/user/domain/model/services'
import UserInfrastructureModule from 'src/user/infrastructure/module'

@Module({
  imports: [CqrsModule, UserDomainEventModule, UserInfrastructureModule],
  providers: [UserWriteModelService, UserReadServiceProvider, UserReadRegistrationModelService],
  exports: [UserWriteModelService, UserReadServiceProvider],
})
class UserDomainModelModule {}

export default UserDomainModelModule
