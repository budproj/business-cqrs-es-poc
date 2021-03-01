import Action, { ActionInterface, ActionProperties } from '@lib/cqrs/bus/action/action'
import ActionTracing from '@lib/cqrs/bus/action/tracing'
import ID from '@lib/ddd/value-objects/id.value-object'

import EventMetadata from './metadata'

interface EventInterface<P> extends ActionInterface<P> {
  metadata: EventMetadata
}

export interface EventProperties<P> extends ActionProperties<P> {
  aggregateID: ID
}

abstract class Event<P = any> extends Action<P> implements EventInterface<P> {
  public readonly aggregateID: ID
  public readonly metadata: EventMetadata
  public readonly tracing!: ActionTracing
  public readonly payload?: P

  constructor({ aggregateID, name, ...rest }: EventProperties<P>) {
    super({ name, ...rest })
    this.aggregateID = aggregateID
    this.metadata = new EventMetadata({ name })
  }
}

export default Event
