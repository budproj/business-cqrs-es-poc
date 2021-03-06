import { USER_AGGREGATE_NAME } from '@core/modules/user/constants'
import { ReadUserAccountRequest } from '@core/modules/user/requests/read-user-account.request'
import { Action } from '@infrastructure/bus/action/action'
import { QUERY_PREFIX } from '@infrastructure/bus/query/constants'
import { Query } from '@infrastructure/bus/query/query'

interface UserAccountQueryProperties {
  payload: ReadUserAccountRequest
  previousAction?: Action
}

export const USER_ACCOUNT_QUERY = `${QUERY_PREFIX}::${USER_AGGREGATE_NAME}::ACCOUNT`

export class UserAccountQuery extends Query<ReadUserAccountRequest> {
  public readonly payload!: ReadUserAccountRequest

  constructor({ previousAction, payload }: UserAccountQueryProperties) {
    super({
      name: USER_ACCOUNT_QUERY,
      previousAction,
      payload,
    })
  }
}
