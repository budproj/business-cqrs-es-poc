import { Logger } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'

import { CREATE_USER } from 'src/user/application/command/constants'
import { CommandCreateUserPayloadDTO } from 'src/user/application/command/dtos'
import { UserApplicationCommandDispatcher } from 'src/user/application/command/services'

import { UserObject } from './models'

@Resolver(() => UserObject)
export class UserPresentationGraphQLResolvers {
  private readonly logger = new Logger(UserPresentationGraphQLResolvers.name)

  constructor(private readonly userCommandsDispatcher: UserApplicationCommandDispatcher) {}

  @Query(() => [UserObject], { name: 'users' })
  protected async getAllUsers() {
    this.logger.log('Fetching all users')

    const user = {
      firstName: 'bla',
    }
    await this.userCommandsDispatcher.dispatch<CommandCreateUserPayloadDTO>(CREATE_USER, user)

    return [
      {
        id: 'teste',
        firstName: 'teste',
      },
    ]
  }
}
