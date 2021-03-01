import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import CreateUserGraphQLResolver from './create-user.graphql.resolver'
import CreateUserApplicationModule from '@modules/user/use-cases/create-user/application/create-user.application.module'

@Module({
  imports: [CqrsModule, CreateUserApplicationModule],
  providers: [CreateUserGraphQLResolver],
  exports: [CreateUserGraphQLResolver],
})
class CreateUserPresentationModule {}

export default CreateUserPresentationModule
