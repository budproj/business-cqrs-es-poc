import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreatedUserEvent, CREATED_USER_EVENT } from '@core/ports/secondary/created-user.event'

import { UserAccountORMEntity } from './user-account.orm-entity'

@EventsHandler(CreatedUserEvent)
export class UserAccountProjectionHandler implements IEventHandler<CreatedUserEvent> {
  private readonly logger = new Logger(UserAccountProjectionHandler.name)

  constructor(
    @InjectRepository(UserAccountORMEntity)
    private readonly repository: Repository<UserAccountORMEntity>,
  ) {}

  public async handle(event: CreatedUserEvent) {
    this.logger.log({
      event,
      message: `New ${CREATED_USER_EVENT} event received`,
    })

    console.log(event)
    //
    // const projectionData = {
    //   aggregateID: event.aggregateID,
    //   ...event.payload,
    // }
    // const user = this.repository.create(projectionData)
    //
    // await this.repository.save(user)
  }
}
