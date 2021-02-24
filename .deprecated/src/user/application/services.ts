import { Injectable } from '@nestjs/common'

import { ApplicationService } from 'lib/application/services'
import { MutationResult } from 'lib/graphql/models'
import { CREATE_USER } from 'src/user/application/command/constants'
import { UserApplicationCommandDispatcher } from 'src/user/application/command/services'
import { READ_ALL_REGISTRATION } from 'src/user/application/query/constants'
import { ReadAllRegistrationQueryDTO } from 'src/user/application/query/dtos'
import { UserApplicationQueryDispatcher } from 'src/user/application/query/services'
import { NewUserCommandPayload } from 'src/user/domain/model/dtos'
import { UserRegistrationEntity } from 'src/user/infrastructure/entities'

interface UserApplicationServiceInterface {
  createUser: (user: NewUserCommandPayload) => Promise<MutationResult>
  getAllUsersRegistration: () => Promise<UserRegistrationEntity[]>
}

@Injectable()
export class UserApplicationService
  extends ApplicationService
  implements UserApplicationServiceInterface {
  constructor(
    protected readonly commandDispatcher: UserApplicationCommandDispatcher,
    protected readonly queryDispatcher: UserApplicationQueryDispatcher,
  ) {
    super()
  }

  public async createUser(user: NewUserCommandPayload) {
    const commandResult = await this.commandDispatcher.dispatch<NewUserCommandPayload>(
      CREATE_USER,
      user,
    )

    const mutationResult = this.buildGraphQLMutationResult(commandResult)

    return mutationResult
  }

  public async getAllUsersRegistration() {
    const result = await this.queryDispatcher.dispatch<ReadAllRegistrationQueryDTO>(
      READ_ALL_REGISTRATION,
    )

    return result as any
  }
}
