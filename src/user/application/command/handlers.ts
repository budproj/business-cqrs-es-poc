import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserDomainService } from 'src/user/domain/services'

import { CREATE_USER } from './constants'
import { CreateUserCommandDTO } from './dtos'

@CommandHandler(CreateUserCommandDTO)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommandDTO> {
  private readonly logger = new Logger(CreateUserCommandHandler.name)

  constructor(private readonly userDomainService: UserDomainService) {}

  public async execute(command: CreateUserCommandDTO) {
    this.logger.log({
      command,
      message: `New ${CREATE_USER} command received`,
    })

    const user = this.userDomainService.buildUserModel(command)

    user.create(command.payload)
    user.commit()
  }
}

const UserApplicationCommandHandlers = [CreateUserCommandHandler]

export default UserApplicationCommandHandlers
