import { ActionMetadata } from './metadata'

export interface ActionInterface<D> {
  metadata: ActionMetadata
  data?: D
}

export interface ActionProperties<D> {
  type: string
  previousAction?: Action
  data?: D
}

export type ActionConstructor = new (..._arguments: any[]) => Action

export abstract class Action<D = any> implements ActionInterface<D> {
  public readonly metadata: ActionMetadata
  public readonly data?: D

  constructor({ type, previousAction, data }: ActionProperties<D>) {
    this.metadata = new ActionMetadata({ type, previousAction })
    this.data = data
  }
}
