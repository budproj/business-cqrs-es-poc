import { typeormConfig } from '@config/typeorm'
import { TypeORMFactory } from '@infrastructure/orm/typeorm.factory'

export = TypeORMFactory.buildTypeORMConnectionConfig(typeormConfig)
