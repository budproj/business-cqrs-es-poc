import { Action } from './action'
import { ActionObject } from './object'
import { ActionTracing, UnmarshalledActionTracing } from './tracing'

export interface ActionMetadataInterface {
  id: string
  type: string
  timestamp: number

  unmarshal: () => UnmarshalledActionMetadata
}

export interface ActionMetadataProperties {
  type: string
  previousAction?: Action
}

export interface UnmarshalledActionMetadata {
  id: string
  type: string
  timestamp: number
  tracing: UnmarshalledActionTracing
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

  public unmarshal() {
    const unmarshalledActionMetadata: UnmarshalledActionMetadata = {
      id: this.id,
      type: this.type,
      timestamp: this.timestamp,
      tracing: this.tracing.unmarshal(),
    }

    return unmarshalledActionMetadata
  }
}
