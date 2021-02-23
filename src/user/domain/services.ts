import { Injectable } from '@nestjs/common'

import { CreateUserCommandDTO } from 'src/user/application/command/dtos'
import { ReadAllRegistrationQueryDTO } from 'src/user/application/query/dtos'
import { UserRegistrationEntity } from 'src/user/infrastructure/entities'

import { UserReadServiceProvider, UserWriteModelService } from './model/services'
import { UserWriteModel } from './model/write'

interface UserDomainServiceInterface {
  createUser: (command: CreateUserCommandDTO) => UserWriteModel
  getAllUsersRegistration: (query: ReadAllRegistrationQueryDTO) => Promise<UserRegistrationEntity[]>
}

@Injectable()
export class UserDomainService implements UserDomainServiceInterface {
  constructor(
    private readonly writeModelService: UserWriteModelService,
    private readonly readModelServiceProvider: UserReadServiceProvider,
  ) {}

  public createUser(command: CreateUserCommandDTO) {
    const user = this.writeModelService.buildWriteModel(command)

    user.create(command.payload)
    user.commit()

    return user
  }

  public async getAllUsersRegistration(query: ReadAllRegistrationQueryDTO) {
    const service = this.readModelServiceProvider.userRegistration
    const model = service.buildReadModel(query)

    const users = await model.getAll()

    return users
  }
}
