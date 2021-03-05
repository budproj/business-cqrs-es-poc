import { ID } from '@core/common/domain/value-objects/id.value-object'
import { Action, ActionInterface, ActionProperties } from '@infrastructure/bus/action/action'
import { ActionMetadata } from '@infrastructure/bus/action/metadata'
import { ActionTracing } from '@infrastructure/bus/action/tracing'

interface EventInterface<P> extends ActionInterface<P> {
  aggregateID: ID
}

interface EventProperties<P> extends ActionProperties<P> {
  aggregateID: ID
}

export abstract class Event<P = any> extends Action<P> implements EventInterface<P> {
  public readonly aggregateID: ID
  public readonly metadata!: ActionMetadata
  public readonly tracing!: ActionTracing
  public readonly payload?: P

  constructor({ aggregateID, name, ...rest }: EventProperties<P>) {
    super({ name, ...rest })
    this.aggregateID = aggregateID
  }
}
