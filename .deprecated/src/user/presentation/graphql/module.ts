import { Module } from '@nestjs/common'

import UserApplicationModule from 'src/user/application/module'

import { UserPresentationGraphQLResolvers } from './resolvers'

@Module({
  imports: [UserApplicationModule],
  providers: [UserPresentationGraphQLResolvers],
  exports: [UserPresentationGraphQLResolvers],
})
class UserPresentationGraphQLModule {}

export default UserPresentationGraphQLModule
