import { Logger } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

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
    const user = {
      ...newUser,
      userID: uuidv4(),
    }

    this.logger.log({
      newUser,
      user,
      message: `New create user request received`,
    })

    const event = this.eventProvider.buildEvent<NewUserDTO>(CREATED_USER, user, this.command)
    this.apply(event)
  }
}
