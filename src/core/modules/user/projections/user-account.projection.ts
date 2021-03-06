import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { CreatedUserEvent, CREATED_USER_EVENT } from '@core/modules/user/events/created-user.event'

@EventsHandler(CreatedUserEvent)
export class UserAccountProjection implements IEventHandler<CreatedUserEvent> {
  private readonly logger = new Logger(UserAccountProjection.name)

  // Constructor(
  //   @InjectRepository(UserAccountEntity)
  //   private readonly repository: MongoRepository<UserAccountEntity>,
  // ) {}

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
