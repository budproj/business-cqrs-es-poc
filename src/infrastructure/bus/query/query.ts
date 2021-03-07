import { Action } from '@infrastructure/bus/action/action'

import { QueryData } from './data'

export abstract class Query<D extends QueryData = any> extends Action {
  public readonly data!: QueryData<D>
}
