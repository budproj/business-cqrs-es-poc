import UserEventService from './events/user.events.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [UserEventService],
})
class UserApplicationModule {}

export default UserApplicationModule
