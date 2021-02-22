export interface Action {
  payload: any
  metadata: ActionMetadata
}

export interface ActionMetadata {
  id: string
  name: string
}
