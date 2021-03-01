import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import UserRegistrationProjectionHandler from './user-registration.event.handler'
import { UserRegistrationEntity } from './user-registration.orm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserRegistrationEntity])],
  providers: [UserRegistrationProjectionHandler],
  exports: [UserRegistrationProjectionHandler],
})
class UserRegistrationModule {}

export default UserRegistrationModule
