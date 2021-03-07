import { Action } from '@infrastructure/bus/action/action'

import { QueryData } from './data'

export abstract class Query<D extends QueryData = QueryData> extends Action {
  public readonly data!: D
}
