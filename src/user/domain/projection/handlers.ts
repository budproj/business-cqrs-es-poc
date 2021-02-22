import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { CREATED_USER } from 'src/user/domain/event/constants'
import { CreatedUserEventDTO } from 'src/user/domain/event/dtos'

@EventsHandler(CreatedUserEventDTO)
export class UserProjectionHandler implements IEventHandler<CreatedUserEventDTO> {
  private readonly logger = new Logger(UserProjectionHandler.name)

  public handle(event: CreatedUserEventDTO) {
    this.logger.log({
      event,
      message: `New ${CREATED_USER} event received`,
    })
  }
}

@EventsHandler(CreatedUserEventDTO)
export class UserProjectionSecondHandler implements IEventHandler<CreatedUserEventDTO> {
  private readonly logger = new Logger(UserProjectionSecondHandler.name)

  public handle(event: CreatedUserEventDTO) {
    this.logger.log({
      event,
      message: `New ${CREATED_USER} event received`,
    })
  }
}

const UserDomainProjectionHandlers = [UserProjectionHandler, UserProjectionSecondHandler]

export default UserDomainProjectionHandlers
