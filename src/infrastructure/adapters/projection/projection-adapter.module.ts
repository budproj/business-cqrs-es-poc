import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UserAccountProjectionModule } from './user-account/user-account.module'

@Module({
  imports: [CqrsModule, UserAccountProjectionModule],
})
export class ProjectionAdapterModule {}
