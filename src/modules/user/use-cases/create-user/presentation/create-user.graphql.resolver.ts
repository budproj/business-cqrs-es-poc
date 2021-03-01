import { Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { MutationResult } from '@interface/adapters/graphql.dto'
import { CreateUserCommand } from '@modules/user/use-cases/create-user/application/create-user.command'
import { CreateUserCommandPayload } from '@modules/user/use-cases/create-user/application/create-user.command.payload'
import { CreateUserResponse } from '@modules/user/use-cases/create-user/presentation/create-user.response.dto'

import { CreateUserInput } from './create-user.graphql.dto'
import { CreateUserRequest } from './create-user.request.dto'

@Resolver()
class CreateUserGraphQLResolver {
  private readonly logger = new Logger(CreateUserGraphQLResolver.name)

  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => MutationResult, { name: 'createUser' })
  protected async createUser(
    @Args('user', { type: () => CreateUserInput })
    user: CreateUserInput,
  ) {
    this.logger.log({
      user,
      message: 'Creating a new user',
    })

    const createUserRequest = new CreateUserRequest(user)
    const createUserCommandPayload = new CreateUserCommandPayload(createUserRequest)
    const createUserCommand = new CreateUserCommand({ payload: createUserCommandPayload })

    await this.commandBus.execute(createUserCommand)

    const response = new CreateUserResponse({
      correlationID: createUserCommand.tracing.correlationID,
    })

    return response
  }
}

export default CreateUserGraphQLResolver
