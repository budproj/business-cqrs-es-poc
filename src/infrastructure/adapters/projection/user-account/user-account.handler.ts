import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler, QueryHandler } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserAccountQuery, USER_ACCOUNT_QUERY } from '@core/ports/primary/user-account.query'
import { CreatedUserEvent, CREATED_USER_EVENT } from '@core/ports/secondary/created-user.event'

import { UserAccountORMEntity } from './user-account.orm-entity'

@EventsHandler(CreatedUserEvent)
@QueryHandler(UserAccountQuery)
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

    const projectionData = {
      aggregateID: event.metadata.aggregateID.value,
      firstName: event.data.firstName.value,
      createdAt: event.data.createdAt.value,
      updatedAt: event.data.updatedAt.value,
    }

    await this.repository.insert(projectionData)
  }

  public async execute(query: UserAccountQuery) {
    this.logger.log({
      query,
      message: `New ${USER_ACCOUNT_QUERY} query received`,
    })

    const selector = query.data.unmarshal()
    const userAccount = await this.repository.findOne(selector)

    return userAccount
  }
}
