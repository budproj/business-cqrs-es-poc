import { Module } from '@nestjs/common'

import { UserApplicationService } from './user-application.service'

@Module({
  providers: [UserApplicationService],
  exports: [UserApplicationService],
})
export class UserApplicationModule {}
