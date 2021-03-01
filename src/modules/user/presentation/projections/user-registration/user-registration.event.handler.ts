import { Injectable, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { CREATED_USER_EVENT } from '@modules/user/core/application/events/created-user/constants'
import CreatedUserEvent from '@modules/user/core/application/events/created-user/created-user.event'

import { UserRegistrationEntity } from './user-registration.orm.entity'

@Injectable()
@EventsHandler(CreatedUserEvent)
class UserRegistrationProjectionHandler implements IEventHandler<CreatedUserEvent> {
  private readonly logger = new Logger(UserRegistrationProjectionHandler.name)

  constructor(
    @InjectRepository(UserRegistrationEntity)
    private readonly repository: MongoRepository<UserRegistrationEntity>,
  ) {}

  public async handle(event: CreatedUserEvent) {
    this.logger.log({
      event,
      message: `New ${CREATED_USER_EVENT} event received`,
    })

    console.log(event)
    console.log('ok')
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

export default UserRegistrationProjectionHandler
