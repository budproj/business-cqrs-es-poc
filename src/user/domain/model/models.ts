import { Logger } from '@nestjs/common'

import { AggregateRoot } from 'lib/models/aggregate-root'
import { CREATED_USER } from 'src/user/domain/event/constants'
import { UserDomainEventProvider } from 'src/user/domain/event/services'

import { UserDTO } from './dtos'

interface UserModelInterface {
  create: (data: UserDTO) => void
}

export class UserModel extends AggregateRoot implements UserModelInterface {
  protected readonly logger = new Logger(UserModel.name)

  constructor(protected readonly eventProvider: UserDomainEventProvider) {
    super()
  }

  public create(user: UserDTO) {
    this.logger.log({
      user,
      message: `New create user request received`,
    })

    const event = this.eventProvider.buildEvent<UserDTO>(CREATED_USER, user)
    this.dispatchEvent(event)
  }
}
