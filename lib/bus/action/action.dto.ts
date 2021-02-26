import { without } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export interface ActionInterface<P> {
  metadata: ActionMetadata
  tracing: ActionTracing
  payload?: P
}

export interface ActionMetadata {
  id: string
  name: string
  timestamp: Date
}

export interface ActionTracing {
  correlationID: string
  stack: Action[]
}

export interface ActionParameters {
  name: ActionMetadata['name']
  previousAction?: Action
}

export type ActionConstructor = new (...arguments_: any[]) => Action

abstract class Action<P = any> implements ActionInterface<P> {
  private _metadata!: ActionMetadata
  private _tracing!: ActionTracing

  constructor({ name, previousAction }: ActionParameters) {
    const metadata = this.buildMetadata(name)
    const tracing = this.buildTrace(previousAction)

    this.metadata = metadata
    this.tracing = tracing
  }

  public get metadata(): ActionMetadata {
    return this._metadata
  }

  public get tracing(): ActionTracing {
    return this._tracing
  }

  public get payload(): P | undefined {
    return this.payload
  }

  public set metadata(metadata: ActionMetadata) {
    this._metadata = metadata
  }

  public set tracing(tracing: ActionTracing) {
    this._tracing = tracing
  }

  public set payload(payload: P | undefined) {
    this.payload = payload
  }

  private buildTrace<T = any>(previousAction?: Action<T>): ActionTracing {
    const correlationID = previousAction?.tracing.correlationID ?? uuidv4()
    const previousActionStack = previousAction?.tracing.stack ?? []

    const stack = without([previousAction, ...previousActionStack], undefined) as Action[]

    return {
      correlationID,
      stack,
    }
  }

  private buildMetadata(name: string): ActionMetadata {
    const metadata = {
      name,
      id: uuidv4(),
      timestamp: new Date(),
    }

    return metadata
  }
}

export default Action
