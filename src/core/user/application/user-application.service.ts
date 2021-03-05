import { Injectable } from '@nestjs/common'

import { CreateUserApplicationRequest } from '@core/user/application/requests/create-user.request'

interface UserApplicationServiceInterface {
  createUser: (createUserRequest: CreateUserApplicationRequest) => void
}

@Injectable()
export class UserApplicationService implements UserApplicationServiceInterface {
  public createUser(createUserRequest: CreateUserApplicationRequest) {
    console.log(createUserRequest)
  }
}
