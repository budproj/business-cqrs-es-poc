import { Logger } from '@nestjs/common'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { UserAggregateRoot } from '@core/modules/user/domain/user.aggregate-root'
import { UserAggregate } from '@core/modules/user/user.aggregate'
import { CreateUserCommand, CREATE_USER_COMMAND } from '@core/ports/primary/create-user.command'
import { EventStorePort } from '@core/ports/secondary/event-store.port'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserCommandHandler.name)

  constructor(
    protected readonly eventStorePort: EventStorePort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute(command: CreateUserCommand) {
    this.logger.log({
      command,
      message: `New ${CREATE_USER_COMMAND} command received`,
    })

    const marshalledCommandData = command.data.marshal()
    const user = UserAggregateRoot.createUser(marshalledCommandData)

    const userAggregateInstance = new UserAggregate(user, command, this.eventStorePort)
    const userAggregate = this.eventPublisher.mergeObjectContext(userAggregateInstance)

    await userAggregate.create(user)
    userAggregate.commit()
  }
}
