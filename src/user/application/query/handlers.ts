import { Injectable, Logger } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { UserDomainService } from 'src/user/domain/services'

import { READ_ALL_REGISTRATION } from './constants'
import { ReadAllRegistrationQueryDTO } from './dtos'

@Injectable()
@QueryHandler(ReadAllRegistrationQueryDTO)
export class ReadAllRegistrationQueryHandler implements IQueryHandler<ReadAllRegistrationQueryDTO> {
  private readonly logger = new Logger(ReadAllRegistrationQueryHandler.name)

  constructor(private readonly userDomain: UserDomainService) {}

  public async execute(query: ReadAllRegistrationQueryDTO) {
    this.logger.log({
      query,
      message: `New ${READ_ALL_REGISTRATION} query received`,
    })

    const users = this.userDomain.getAllUsersRegistration(query)

    return users
  }
}

const UserApplicationQueryHandlers = [ReadAllRegistrationQueryHandler]

export default UserApplicationQueryHandlers
