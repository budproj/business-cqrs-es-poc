import { without } from 'lodash'

import { Action } from './action'
import { ActionObject } from './object'

interface ActionTracingInterface {
  correlationID: string
  stack: Action[]
}

export class ActionTracing extends ActionObject implements ActionTracingInterface {
  public readonly correlationID: string
  public readonly stack: Action[]

  constructor(protected readonly previousAction?: Action) {
    super()
    this.correlationID = previousAction?.metadata.tracing.correlationID ?? this.generateID()
    this.stack = this.appendToPreviousStack(previousAction)
  }

  private appendToPreviousStack(previousAction?: Action): Action[] {
    const previousActionStack = previousAction?.metadata.tracing.stack ?? []
    // eslint-disable-next-line unicorn/no-useless-undefined
    const stack = without([previousAction, ...previousActionStack], undefined) as Action[]

    return stack
  }
}
