import { Module } from '@nestjs/common'

import TypeORMModule from './orm/orm.module'

@Module({
  imports: [TypeORMModule],
})
class InfrastructureModule {}

export default InfrastructureModule
