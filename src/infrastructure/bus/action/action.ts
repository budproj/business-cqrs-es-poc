import { ObjectLiteral } from '@core/common/types/object-literal.type'
import { ActionMetadata } from './metadata'

export interface ActionInterface<D extends ObjectLiteral> {
  metadata: ActionMetadata
  data?: D
}

export interface ActionProperties<D extends ObjectLiteral> {
  type: string
  previousAction?: Action
  data?: D
}

export abstract class Action<D extends ObjectLiteral = ObjectLiteral>
  implements ActionInterface<D> {
  public readonly metadata: ActionMetadata
  public readonly data?: D

  constructor({ type, previousAction, data }: ActionProperties<D>) {
    this.metadata = new ActionMetadata({ type, previousAction })
    this.data = data
  }
}
