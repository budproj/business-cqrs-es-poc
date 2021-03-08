import { Action } from './action'
import { ActionObject } from './object'
import { ActionTracing } from './tracing'

export interface ActionMetadataInterface {
  id: string
  type: string
  timestamp: number
}

export type ActionMetadataProperties = {
  type: string
  previousAction?: Action
}

export class ActionMetadata extends ActionObject implements ActionMetadataInterface {
  public readonly id: string
  public readonly type: string
  public readonly timestamp: number
  public readonly tracing: ActionTracing

  constructor({ type, previousAction }: ActionMetadataProperties) {
    super()

    this.id = this.generateID()
    this.timestamp = this.generateTimestamp()
    this.type = type
    this.tracing = new ActionTracing(previousAction)
  }
}
