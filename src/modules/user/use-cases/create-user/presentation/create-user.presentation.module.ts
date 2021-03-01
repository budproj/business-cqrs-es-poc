import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import CreateUserApplicationModule from '@modules/user/use-cases/create-user/application/create-user.application.module'

import CreateUserGraphQLResolver from './create-user.graphql.resolver'

@Module({
  imports: [CqrsModule, CreateUserApplicationModule],
  providers: [CreateUserGraphQLResolver],
  exports: [CreateUserGraphQLResolver],
})
class CreateUserPresentationModule {}

export default CreateUserPresentationModule
