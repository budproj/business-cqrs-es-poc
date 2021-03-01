import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import CreateUserCommandHandler from './create-user.handler'
import CreateUserService from './create-user.service'

@Module({
  imports: [CqrsModule],
  providers: [CreateUserService, CreateUserCommandHandler],
})
class CreateUserApplicationModule {}

export default CreateUserApplicationModule
