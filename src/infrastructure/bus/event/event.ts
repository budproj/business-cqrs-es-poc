import { JSONType } from '@eventstore/db-client'

import { ID } from '@core/common/domain/value-objects/id.value-object'
import { Action, ActionInterface, ActionProperties } from '@infrastructure/bus/action/action'

import { EventMetadata } from './metadata'

interface EventInterface<D> extends ActionInterface<D> {
  data: D
}

type EventProperties<D> = {
  aggregateID: ID
  version: number
} & ActionProperties<D>

export abstract class Event<D extends JSONType = JSONType>
  extends Action<D>
  implements EventInterface<D> {
  public readonly metadata: EventMetadata
  public readonly data!: D

  constructor({ aggregateID, version, ...rest }: EventProperties<D>) {
    super(rest)
    this.metadata = new EventMetadata({ aggregateID, version, ...rest })
  }
}
