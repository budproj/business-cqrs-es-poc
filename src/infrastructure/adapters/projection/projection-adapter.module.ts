import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { UserAccountProjectionHandler } from './user-account/user-account.handler'

const ProjectionHandlers = [UserAccountProjectionHandler]

@Module({
  imports: [CqrsModule],
  providers: ProjectionHandlers,
})
export class ProjectionAdapterModule {}
