export interface Action {
  payload: any
  metadata: ActionMetadata
  tracing: ActionTracing
}

export interface ActionMetadata {
  id: string
  name: string
}

export interface ActionTracing {
  correlationID: string
  stack: Action[]
}
