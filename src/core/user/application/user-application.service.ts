import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { CreateUserApplicationRequest } from '@core/user/application/requests/create-user.request'

import { CreateUserCommand } from './use-cases/create-user/create-user.command'

interface UserApplicationServiceInterface {
  createUser: (createUserRequest: CreateUserApplicationRequest) => Promise<CreateUserCommand>
}

@Injectable()
export class UserApplicationService implements UserApplicationServiceInterface {
  constructor(private readonly commandBus: CommandBus) {}

  public async createUser(createUserRequest: CreateUserApplicationRequest) {
    const commandProperties = { payload: createUserRequest }
    const command = new CreateUserCommand(commandProperties)

    await this.commandBus.execute(command)

    return command
  }
}
