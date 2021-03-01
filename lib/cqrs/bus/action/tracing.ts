import { without } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import Action from './action'

interface ActionTracingInterface {
  correlationID: string
  stack: Action[]
}

class ActionTracing implements ActionTracingInterface {
  public readonly correlationID: string
  public readonly stack: Action[]

  constructor(protected readonly previousAction?: Action) {
    this.correlationID = previousAction?.tracing.correlationID ?? uuidv4()
    this.stack = this.appendToPreviousStack(previousAction)
  }

  private appendToPreviousStack(previousAction?: Action): Action[] {
    const previousActionStack = previousAction?.tracing.stack ?? []
    const stack = without([previousAction, ...previousActionStack]) as Action[]

    return stack
  }
}

export default ActionTracing
