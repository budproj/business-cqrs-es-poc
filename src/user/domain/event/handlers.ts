import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { CREATED_USER } from './constants'
import { CreatedUserEventDTO } from './dtos'

@EventsHandler(CreatedUserEventDTO)
export class CreatedUserEventHandler implements IEventHandler<CreatedUserEventDTO> {
  private readonly logger = new Logger(CreatedUserEventHandler.name)

  public handle(event: CreatedUserEventDTO) {
    this.logger.log({
      event,
      message: `New ${CREATED_USER} event received`,
    })
  }
}

const UserDomainEventHandlers = [CreatedUserEventHandler]

export default UserDomainEventHandlers
