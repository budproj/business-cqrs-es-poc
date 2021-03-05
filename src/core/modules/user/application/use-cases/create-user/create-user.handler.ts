import { Logger } from '@nestjs/common'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { CREATE_USER_COMMAND } from './constants'
import { CreateUserCommand } from './create-user.command'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserCommandHandler.name)

  constructor(private readonly eventPublisher: EventPublisher) {}

  public async execute(command: CreateUserCommand) {
    this.logger.log({
      command,
      message: `New ${CREATE_USER_COMMAND} command received`,
    })

    console.log(command)
  }
}
