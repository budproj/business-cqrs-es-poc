import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserAggregateRoot } from '@core/modules/user/domain/user.aggregate-root'
import { CreateUserRequest } from '@core/modules/user/requests/create-user.request'
import { UserApplicationAggregateFactory } from '@core/modules/user/user-aggregate.factory'
import {
  CreateUserCommandPort,
  CREATE_USER_COMMAND,
} from '@core/ports/primary/create-user-command.port'

@CommandHandler(CreateUserCommandPort)
export class CreateUserCommandPortHandler implements ICommandHandler<CreateUserCommandPort> {
  private readonly logger = new Logger(CreateUserCommandPortHandler.name)

  constructor(
    protected readonly userApplicationAggregateFactory: UserApplicationAggregateFactory,
  ) {}

  public async execute(command: CreateUserCommandPort) {
    this.logger.log({
      command,
      message: `New ${CREATE_USER_COMMAND} command received`,
    })

    const createUserRequest = new CreateUserRequest(command.data)
    const user = UserAggregateRoot.createUser(createUserRequest)
    const userAggregate = this.userApplicationAggregateFactory.createAggregateForEntity(
      user,
      command,
    )

    await userAggregate.create(user)
    userAggregate.commit()
  }
}
