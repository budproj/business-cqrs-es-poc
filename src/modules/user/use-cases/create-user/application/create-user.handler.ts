import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { CREATE_USER_COMMAND } from './constants'
import { CreateUserCommand } from './create-user.command'
import CreateUserService from './create-user.service'

@CommandHandler(CreateUserCommand)
class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserCommandHandler.name)

  constructor(private readonly createUserService: CreateUserService) {}

  public async execute(command: CreateUserCommand) {
    this.logger.log({
      command,
      message: `New ${CREATE_USER_COMMAND} command received`,
    })

    await this.createUserService.createUser(command)
  }
}

export default CreateUserCommandHandler
