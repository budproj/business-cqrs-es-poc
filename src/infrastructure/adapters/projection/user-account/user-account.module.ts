import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserAccountProjectionHandler } from './user-account.handler'
import { UserAccountORMEntity } from './user-account.orm-entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserAccountORMEntity])],
  providers: [UserAccountProjectionHandler],
})
export class UserAccountProjectionModule {}
