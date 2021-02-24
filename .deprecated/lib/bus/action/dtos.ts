import { remove } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export interface ActionInterface {
  metadata: ActionMetadata
  tracing: ActionTracing
  payload?: any
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

export abstract class Action implements ActionInterface {
  public metadata: ActionMetadata
  public tracing: ActionTracing
  public payload?: any

  constructor({ name, previousAction }: ActionParameters) {
    const metadata = this.buildMetadata(name)
    const tracing = this.buildTrace(previousAction)

    this.setMetadata(metadata)
    this.setTracing(tracing)
  }

  private setMetadata(metadata: ActionMetadata) {
    this.metadata = metadata
  }

  private setTracing(tracing: ActionTracing) {
    this.tracing = tracing
  }

  private buildTrace(previousAction?: Action) {
    const correlationID = previousAction?.tracing.correlationID ?? uuidv4()
    const previousActionStack = previousAction?.tracing.stack ?? []

    const stack = remove([previousAction, ...previousActionStack])

    return {
      correlationID,
      stack,
    }
  }

  private buildMetadata(name: string) {
    const metadata = {
      name,
      id: uuidv4(),
      timestamp: new Date(),
    }

    return metadata
  }
}
