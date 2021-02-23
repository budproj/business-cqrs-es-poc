import { Action, ActionMetadata, ActionParameters, ActionTracing } from 'lib/bus/action/dtos'

export interface QueryParameters extends ActionParameters {}

export abstract class QueryDTO<P = any> extends Action {
  public readonly payload: P
  public readonly metadata: ActionMetadata
  public readonly tracing: ActionTracing
}
