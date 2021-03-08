import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler, QueryHandler } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  UserAccountQueryPort,
  USER_ACCOUNT_QUERY,
} from '@core/ports/primary/user-account-query.port'
import {
  CreatedUserEventPort,
  CREATED_USER_EVENT,
} from '@core/ports/secondary/created-user-event.port'

import { UserAccountORMEntity } from './user-account.orm-entity'

@EventsHandler(CreatedUserEventPort)
@QueryHandler(UserAccountQueryPort)
export class UserAccountProjectionHandler implements IEventHandler<CreatedUserEventPort> {
  private readonly logger = new Logger(UserAccountProjectionHandler.name)

  constructor(
    @InjectRepository(UserAccountORMEntity)
    private readonly repository: Repository<UserAccountORMEntity>,
  ) {}

  public async handle(event: CreatedUserEventPort) {
    this.logger.log({
      event,
      message: `New ${CREATED_USER_EVENT} event received`,
    })

    const projectionData = {
      aggregateID: event.metadata.aggregateID.value,
      firstName: event.data.firstName,
      createdAt: event.data.createdAt,
      updatedAt: event.data.updatedAt,
    }

    await this.repository.insert(projectionData)
  }

  public async execute(query: UserAccountQueryPort) {
    this.logger.log({
      query,
      message: `New ${USER_ACCOUNT_QUERY} query received`,
    })

    const selector = query.data
    const userAccount = await this.repository.findOne(selector)

    return userAccount
  }
}
