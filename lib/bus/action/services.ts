import { remove } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { Action } from './dtos'

export abstract class ActionService {
  protected buildTrace<A extends Action = Action>(previousAction?: A) {
    const correlationID = previousAction?.tracing.correlationID ?? uuidv4()
    const previousActionStack = previousAction?.tracing.stack ?? []

    const stack = remove([previousAction, ...previousActionStack])

    return {
      correlationID,
      stack,
    }
  }
}
