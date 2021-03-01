import { Injectable } from '@nestjs/common'
import { CreateUserCommand } from './create-user.command'

interface CreateUserServiceInterface {
  createUser: (createUserCommand: CreateUserCommand) => Promise<any>
}

@Injectable()
class CreateUserService implements CreateUserServiceInterface {
  public async createUser(createUserCommand: CreateUserCommand) {
    console.log(createUserCommand)
  }
}

export default CreateUserService
