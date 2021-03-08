import { ReadUserAccountRequest } from '@core/modules/user/requests/read-user-account.request'
import { Action } from '@infrastructure/bus/action/action'
import { Query } from '@infrastructure/bus/query/query'

interface UserAccountQueryPortProperties {
  data: ReadUserAccountRequest
  previousAction?: Action
}

export const USER_ACCOUNT_QUERY = 'UserAccountQueryPort'

export class UserAccountQueryPort extends Query<ReadUserAccountRequest> {
  public readonly data!: ReadUserAccountRequest

  constructor({ previousAction, data }: UserAccountQueryPortProperties) {
    super({
      type: USER_ACCOUNT_QUERY,
      previousAction,
      data,
    })
  }
}
