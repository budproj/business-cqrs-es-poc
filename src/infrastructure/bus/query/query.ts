import { Action } from '@infrastructure/bus/action/action'

import { QueryPayload } from './payload'

export abstract class Query<P extends QueryPayload = any> extends Action {
  public readonly payload!: QueryPayload<P>
}
