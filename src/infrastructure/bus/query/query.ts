import { Action } from '@infrastructure/bus/action/action'
import { ObjectLiteral } from 'typeorm'

export abstract class Query<D extends ObjectLiteral = ObjectLiteral> extends Action {
  public readonly data!: D
}
