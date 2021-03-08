import { ActionMetadata } from './metadata'

export interface ActionInterface<D> {
  metadata: ActionMetadata
  data?: D
}

export type ActionProperties<D> = {
  type: string
  previousAction?: Action
  data?: D
}

export abstract class Action<D = unknown> implements ActionInterface<D> {
  public readonly metadata: ActionMetadata
  public readonly data?: D

  constructor({ type, previousAction, data }: ActionProperties<D>) {
    this.metadata = new ActionMetadata({ type, previousAction })
    this.data = data
  }
}
