import { ID } from '@core/common/domain/value-objects/id.value-object'
import { Action, ActionInterface, ActionProperties } from '@infrastructure/bus/action/action'
import { ObjectLiteral } from '@core/common/types/object-literal.type'

import { EventMetadata } from './metadata'

interface EventInterface<D extends ObjectLiteral> extends ActionInterface<D> {
  data: D
}

interface EventProperties<D extends ObjectLiteral> extends ActionProperties<D> {
  aggregateID: ID
  version: number
}

export abstract class Event<D extends ObjectLiteral = ObjectLiteral>
  extends Action<D>
  implements EventInterface<D> {
  public readonly metadata: EventMetadata
  public readonly data!: D

  constructor({ aggregateID, version, ...rest }: EventProperties<D>) {
    super(rest)
    this.metadata = new EventMetadata({ aggregateID, version, ...rest })
  }
}
