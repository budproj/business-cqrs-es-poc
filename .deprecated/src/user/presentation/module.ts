import { Module } from '@nestjs/common'

import UserPresentationGraphQLModule from './graphql/module'

@Module({
  imports: [UserPresentationGraphQLModule],
  exports: [UserPresentationGraphQLModule],
})
class UserPresentationModule {}

export default UserPresentationModule
