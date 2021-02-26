import { Module } from '@nestjs/common'

import CreateUserGraphQLResolver from './create-user.graphql.resolver'

@Module({
  providers: [CreateUserGraphQLResolver],
  exports: [CreateUserGraphQLResolver],
})
class CreateUserModule {}

export default CreateUserModule
