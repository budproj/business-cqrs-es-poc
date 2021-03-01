import { Module } from '@nestjs/common'

import UserRegistrationModule from './user-registration/user-registration.module'

@Module({
  imports: [UserRegistrationModule],
})
class UserProjectionsModule {}

export default UserProjectionsModule
