import { ID } from '@core/common/domain/value-objects/id.value-object'
import { Action, ActionInterface, ActionProperties } from '@infrastructure/bus/action/action'

import { EventMetadata, UnmarshalledEventMetadata } from './metadata'

interface EventInterface<D> extends ActionInterface<D> {
  data: D

  unmarshal: () => UnmarshalledEvent
}

interface EventProperties<D> extends ActionProperties<D> {
  aggregateID: ID
  version: number
}

interface UnmarshalledEvent<D = any> {
  metadata: UnmarshalledEventMetadata
  data: D
}

export abstract class Event<D = any> extends Action<D> implements EventInterface<D> {
  public readonly metadata: EventMetadata
  public readonly data!: D

  constructor({ aggregateID, version, ...rest }: EventProperties<D>) {
    super(rest)
    this.metadata = new EventMetadata({ aggregateID, version, ...rest })
  }

  public unmarshal() {
    const unmarshalledEvent: UnmarshalledEvent = {
      metadata: this.metadata.unmarshal(),
      data: this.data,
    }

    return unmarshalledEvent
  }
}
