import { Logger } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { MutationResult } from '@interface/adapters/graphql.dto'

import { CreateUserInput } from './create-user.graphql.dto'
import { CreateUserRequest } from './create-user.request.dto'
import { CreateUserCommand } from '@modules/user/use-cases/create-user/application/create-user.command'
import { CommandBus } from '@nestjs/cqrs'

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
    const createUserCommand = new CreateUserCommand({ payload: createUserRequest })

    await this.commandBus.execute(createUserCommand)

    return {}
  }
}

export default CreateUserGraphQLResolver
