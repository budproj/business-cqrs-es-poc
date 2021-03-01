import CreateUserCommandHandler from './create-user.handler'
import { Module } from '@nestjs/common'

import CreateUserService from './create-user.service'

@Module({
  providers: [CreateUserService, CreateUserCommandHandler],
})
class CreateUserApplicationModule {}

export default CreateUserApplicationModule
