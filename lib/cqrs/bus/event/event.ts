import Action, { ActionProperties } from '@lib/cqrs/bus/action/action'
import ValueObject from '@lib/ddd/value-object'

export interface EventProperties<P> extends ActionProperties<P> {
  aggregateID: ValueObject<string>
}

abstract class Event<P = any> extends Action<P> {
  protected readonly aggregateID: ValueObject<string>

  constructor({ aggregateID, ...rest }: EventProperties<P>) {
    super(rest)
    this.aggregateID = aggregateID
  }
}

export default Event
