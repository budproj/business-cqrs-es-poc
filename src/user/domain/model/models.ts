import { Logger } from '@nestjs/common'

import { ModelAggregateRoot } from 'lib/models/aggregate-root'
import { CREATED_USER } from 'src/user/domain/event/constants'
import { UserDomainEventProvider } from 'src/user/domain/event/services'

import { NewUserCommandPayload, NewUserDTO } from './dtos'

interface UserModelInterface {
  create: (newUser: NewUserDTO) => void
}

export class UserModel extends ModelAggregateRoot implements UserModelInterface {
  protected readonly logger = new Logger(UserModel.name)

  constructor(protected readonly eventProvider: UserDomainEventProvider) {
    super()
  }

  public create(newUser: NewUserCommandPayload) {
    this.logger.log({
      newUser,
      message: `New create user request received`,
    })

    const event = this.eventProvider.buildEvent<NewUserDTO>(CREATED_USER, newUser, this.command)
    this.dispatchEvent(event)
  }
}
