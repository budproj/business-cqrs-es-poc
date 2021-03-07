import { ActionData } from './data'
import { ActionMetadata, UnmarshalledActionMetadata } from './metadata'

export interface ActionInterface<D> {
  metadata: ActionMetadata
  data?: D

  unmarshal: () => UnmarshalledAction
}

export interface ActionProperties<D> {
  type: string
  previousAction?: Action
  data?: D
}

export interface UnmarshalledAction<D = any> {
  metadata: UnmarshalledActionMetadata
  data?: D
}

export abstract class Action<D extends ActionData = ActionData> implements ActionInterface<D> {
  public readonly metadata: ActionMetadata
  public readonly data?: D

  constructor({ type, previousAction, data }: ActionProperties<D>) {
    this.metadata = new ActionMetadata({ type, previousAction })
    this.data = data
  }

  public unmarshal() {
    const unmarshalledAction: UnmarshalledAction = {
      metadata: this.metadata.unmarshal(),
      data: this.data?.unmarshal(),
    }

    return unmarshalledAction
  }
}
