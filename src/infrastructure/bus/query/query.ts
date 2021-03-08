import { Action } from '@infrastructure/bus/action/action'

export abstract class Query<D = unknown> extends Action {
  public readonly data!: D
}
