import CreateUserModule from './create-user/create-user.module'
import { Module } from '@nestjs/common'
import ReadUserAccountModule from './read-user-account/read-user-account.module'

@Module({
  imports: [CreateUserModule, ReadUserAccountModule],
  exports: [CreateUserModule, ReadUserAccountModule],
})
class UserUseCasesModule {}

export default UserUseCasesModule
