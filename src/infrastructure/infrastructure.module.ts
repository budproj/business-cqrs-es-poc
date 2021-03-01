import { Module } from '@nestjs/common'

import ORMModule from './orm/orm.module'

@Module({
  imports: [ORMModule],
})
class InfrastructureModule {}

export default InfrastructureModule
