import { Action, ActionMetadata } from 'lib/bus/action/dtos'

export abstract class EventDTO<P = any> implements Action {
  public readonly payload: P
  public readonly metadata: ActionMetadata
}
