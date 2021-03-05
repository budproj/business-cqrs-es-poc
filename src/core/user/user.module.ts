import { Module } from '@nestjs/common'

import { UserApplicationModule } from './application/user-application.module'

@Module({
  imports: [UserApplicationModule],
  exports: [UserApplicationModule],
})
export class UserModule {}
