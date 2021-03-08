import { ID } from '@core/common/domain/value-objects/id.value-object'
import {
  Action,
  ActionInterface,
  ActionProperties,
  UnmarshalledAction,
} from '@infrastructure/bus/action/action'

import { EventData, UnmarshalledEventData } from './data'
import { EventMetadata, UnmarshalledEventMetadata } from './metadata'

interface EventInterface<D> extends ActionInterface<D> {
  data: D

  unmarshal: () => UnmarshalledEvent<D>
}

interface EventProperties<D> extends ActionProperties<D> {
  aggregateID: ID
  version: number
}

export interface UnmarshalledEvent<D = any> extends UnmarshalledAction {
  data: UnmarshalledEventData<keyof D>
  metadata: UnmarshalledEventMetadata
}

export abstract class Event<D extends EventData = EventData>
  extends Action<D>
  implements EventInterface<D> {
  public readonly metadata: EventMetadata
  public readonly data!: D

  constructor({ aggregateID, version, ...rest }: EventProperties<D>) {
    super(rest)
    this.metadata = new EventMetadata({ aggregateID, version, ...rest })
  }

  public unmarshal() {
    const unmarshalledEvent: UnmarshalledEvent = {
      metadata: this.metadata.unmarshal(),
      data: this.data.unmarshal(),
    }

    return unmarshalledEvent
  }
}
