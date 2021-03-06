import { ID } from '@core/common/domain/value-objects/id.value-object'
import { Action, ActionInterface, ActionProperties } from '@infrastructure/bus/action/action'
import { ActionTracing } from '@infrastructure/bus/action/tracing'

import { EventMetadata } from './metadata'

interface EventInterface<P> extends ActionInterface<P> {
  aggregateID: ID
}

interface EventProperties<P> extends ActionProperties<P> {
  aggregateID: ID
  version: number
}

export abstract class Event<P = any> extends Action<P> implements EventInterface<P> {
  public readonly aggregateID: ID
  public readonly metadata: EventMetadata
  public readonly tracing!: ActionTracing
  public readonly payload?: P

  constructor({ aggregateID, name, version, ...rest }: EventProperties<P>) {
    super({ name, ...rest })
    this.aggregateID = aggregateID
    this.metadata = new EventMetadata({ name, version, ...rest })
  }
}
