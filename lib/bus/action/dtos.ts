export interface ActionInterface {
  payload: any
  metadata: ActionMetadata
  tracing?: ActionTracing

  setTracing: (tracing: ActionTracing) => void
}

export interface ActionMetadata {
  id: string
  name: string
}

export interface ActionTracing {
  correlationID: string
  stack: Action[]
}

export abstract class Action implements ActionInterface {
  public payload: any
  public metadata: ActionMetadata
  public tracing?: ActionTracing

  public setTracing(tracing: ActionTracing) {
    this.tracing = tracing
  }
}
