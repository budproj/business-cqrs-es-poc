import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserAggregateRoot } from '@core/modules/user/domain/user.aggregate-root'
import { UserApplicationAggregateFactory } from '@core/modules/user/user-aggregate.factory'
import { CreateUserCommand, CREATE_USER_COMMAND } from '@core/ports/primary/create-user.command'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserCommandHandler.name)

  constructor(
    protected readonly userApplicationAggregateFactory: UserApplicationAggregateFactory,
  ) {}

  public async execute(command: CreateUserCommand) {
    this.logger.log({
      command,
      message: `New ${CREATE_USER_COMMAND} command received`,
    })

    const marshalledCommandData = command.data.marshal()
    const user = UserAggregateRoot.createUser(marshalledCommandData)
    const userAggregate = this.userApplicationAggregateFactory.createAggregateForEntity(
      user,
      command,
    )

    await userAggregate.create(user)
    userAggregate.commit()
  }
}
