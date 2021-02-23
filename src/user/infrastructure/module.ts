import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserRegistrationEntity } from './entities'

const UserInfrastructureEntities = TypeOrmModule.forFeature([UserRegistrationEntity])

@Module({
  imports: [UserInfrastructureEntities],
  exports: [UserInfrastructureEntities],
})
class UserInfrastructureModule {}

export default UserInfrastructureModule
