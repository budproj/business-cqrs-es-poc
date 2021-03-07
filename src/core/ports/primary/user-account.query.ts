import { ReadUserAccountRequest } from '@core/modules/user/requests/read-user-account.request'
import { Action } from '@infrastructure/bus/action/action'
import { Query } from '@infrastructure/bus/query/query'

interface UserAccountQueryProperties {
  data: ReadUserAccountRequest
  previousAction?: Action
}

export const USER_ACCOUNT_QUERY = 'UserAccountQuery'

export class UserAccountQuery extends Query<ReadUserAccountRequest> {
  public readonly data!: ReadUserAccountRequest

  constructor({ previousAction, data }: UserAccountQueryProperties) {
    super({
      type: USER_ACCOUNT_QUERY,
      previousAction,
      data,
    })
  }
}
