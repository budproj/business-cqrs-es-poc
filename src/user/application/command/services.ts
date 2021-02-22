import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { CommandDispatcher, CommandHashmap } from 'lib/bus/command/services'

import { CREATE_USER } from './constants'
import { CreateUserCommandDTO } from './dtos'

@Injectable()
export class UserApplicationCommandDispatcher extends CommandDispatcher {
  public readonly commands: CommandHashmap

  constructor(protected readonly commandBus: CommandBus) {
    super(
      {
        [CREATE_USER]: CreateUserCommandDTO,
      },
      commandBus,
    )
  }
}
