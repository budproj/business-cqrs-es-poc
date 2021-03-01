import { without } from 'lodash'

import ID from '@lib/ddd/value-objects/id.value-object'

import Action from './action'

interface ActionTracingInterface {
  correlationID: ID
  stack: Action[]
}

class ActionTracing implements ActionTracingInterface {
  public readonly correlationID: ID
  public readonly stack: Action[]

  constructor(protected readonly previousAction?: Action) {
    this.correlationID = previousAction?.tracing.correlationID ?? ID.generate()
    this.stack = this.appendToPreviousStack(previousAction)
  }

  private appendToPreviousStack(previousAction?: Action): Action[] {
    const previousActionStack = previousAction?.tracing.stack ?? []
    // eslint-disable-next-line unicorn/no-useless-undefined
    const stack = without([previousAction, ...previousActionStack], undefined) as Action[]

    return stack
  }
}

export default ActionTracing
