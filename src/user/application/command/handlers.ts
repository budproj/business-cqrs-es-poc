import { Logger } from '@nestjs/common'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { UserDomainEventProvider } from 'src/user/domain/event/services'
import { UserModel } from 'src/user/domain/model/models'

import { CREATE_USER } from './constants'
import { CreateUserCommandDTO } from './dtos'

@CommandHandler(CreateUserCommandDTO)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommandDTO> {
  private readonly logger = new Logger(CreateUserCommandHandler.name)

  constructor(
    protected readonly eventPublisher: EventPublisher,
    private readonly eventProvider: UserDomainEventProvider,
  ) {}

  public async execute(command: CreateUserCommandDTO) {
    this.logger.log({
      command,
      message: `New ${CREATE_USER} command received`,
    })

    const user = this.eventPublisher.mergeObjectContext(new UserModel(this.eventProvider))

    user.create(command.payload)
    user.commit()
  }
}

const UserApplicationCommandHandlers = [CreateUserCommandHandler]

export default UserApplicationCommandHandlers
