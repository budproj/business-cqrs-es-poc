import { Action, ActionMetadata, ActionParameters, ActionTracing } from 'lib/bus/action/dtos'

export interface EventParameters extends ActionParameters {}

export abstract class EventDTO<P = any> extends Action {
  public readonly payload: P
  public readonly metadata: ActionMetadata
  public readonly tracing: ActionTracing
}
