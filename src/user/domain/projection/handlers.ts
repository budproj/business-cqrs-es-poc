import { Injectable, Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { CREATED_USER } from 'src/user/domain/event/constants'
import { CreatedUserEventDTO } from 'src/user/domain/event/dtos'
import { UserRegistrationEntity } from 'src/user/infrastructure/entities'

@Injectable()
@EventsHandler(CreatedUserEventDTO)
export class UserRegistrationProjectionHandler implements IEventHandler<CreatedUserEventDTO> {
  private readonly logger = new Logger(UserRegistrationProjectionHandler.name)

  constructor(
    @InjectRepository(UserRegistrationEntity)
    private readonly repository: MongoRepository<UserRegistrationEntity>,
  ) {}

  public async handle(event: CreatedUserEventDTO) {
    this.logger.log({
      event,
      message: `New ${CREATED_USER} event received`,
    })

    const user = this.repository.create(event.payload)
    await this.repository.save(user)
  }
}

const UserDomainProjectionHandlers = [UserRegistrationProjectionHandler]

export default UserDomainProjectionHandlers
