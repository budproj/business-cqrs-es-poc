import { Action, ActionMetadata, ActionParameters, ActionTracing } from 'lib/bus/action/dtos'

export interface CommandParameters extends ActionParameters {}

export abstract class CommandDTO<P = any> extends Action {
  public readonly payload: P
  public readonly metadata: ActionMetadata
  public readonly tracing: ActionTracing
}
