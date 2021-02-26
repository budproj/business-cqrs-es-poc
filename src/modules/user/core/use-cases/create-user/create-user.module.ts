import CreateUserGraphQLResolver from './create-user.graphql.resolver'
import { Module } from '@nestjs/common'

@Module({
  providers: [CreateUserGraphQLResolver],
  exports: [CreateUserGraphQLResolver],
})
class CreateUserModule {}

export default CreateUserModule
