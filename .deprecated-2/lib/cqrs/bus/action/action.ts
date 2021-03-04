import ActionMetadata from './metadata'
import ActionTracing from './tracing'

export interface ActionInterface<P> {
  metadata: ActionMetadata
  tracing: ActionTracing
  payload?: P
}

export interface ActionProperties<P> {
  name: string
  previousAction?: Action
  payload?: P
}

export type ActionConstructor = new (..._arguments: any[]) => Action

abstract class Action<P = any> implements ActionInterface<P> {
  public readonly metadata: ActionMetadata
  public readonly tracing: ActionTracing
  public readonly payload?: P

  constructor({ name, previousAction, payload }: ActionProperties<P>) {
    this.metadata = new ActionMetadata({ name })
    this.tracing = new ActionTracing(previousAction)
    this.payload = payload
  }
}

export default Action
