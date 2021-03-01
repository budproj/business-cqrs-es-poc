import CreateUserApplicationModule from './application/create-user.application.module'
import CreateUserPresentationModule from './presentation/create-user.presentation.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [CreateUserPresentationModule, CreateUserApplicationModule],
  exports: [CreateUserPresentationModule],
})
class CreateUserModule {}

export default CreateUserModule