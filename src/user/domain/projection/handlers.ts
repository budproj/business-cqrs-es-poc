import { Injectable, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { CREATED_USER } from 'src/user/domain/event/constants'
import { CreatedUserEventDTO } from 'src/user/domain/event/dtos'
import { NewUserProjectionRepository } from 'src/user/domain/projection/repositories'

@EventsHandler(CreatedUserEventDTO)
@Injectable()
export class UserProjectionHandler implements IEventHandler<CreatedUserEventDTO> {
  private readonly logger = new Logger(UserProjectionHandler.name)

  constructor(private readonly repository: NewUserProjectionRepository) {}

  public async handle(event: CreatedUserEventDTO) {
    this.logger.log({
      event,
      message: `New ${CREATED_USER} event received`,
    })

    const user = this.repository.create(event.payload)
    await this.repository.save(user)
  }
}

const UserDomainProjectionHandlers = [UserProjectionHandler]

export default UserDomainProjectionHandlers
