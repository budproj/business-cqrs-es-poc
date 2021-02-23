import { Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { QueryDTO } from 'lib/bus/query/dtos'
import { OperationReadModel } from 'lib/operation/read/models'
import { UserRegistrationEntity } from 'src/user/infrastructure/entities'

interface UserModelInterface {
  getAll: () => Promise<UserRegistrationEntity[]>
}

export class UserRegistrationReadModel extends OperationReadModel implements UserModelInterface {
  protected readonly logger = new Logger(UserRegistrationReadModel.name)

  constructor(
    protected readonly query: QueryDTO,
    @InjectRepository(UserRegistrationEntity)
    protected readonly repository: MongoRepository<UserRegistrationEntity>,
  ) {
    super()
  }

  public async getAll() {
    this.logger.log({
      query: this.query,
      message: 'Getting all user registration data',
    })
    const users = await this.repository.find()

    return users
  }
}
