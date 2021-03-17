import { ObjectLiteral } from '@core/common/types/object-literal.type'

import { EXCEPTION } from './constants'

type SerializedException = {
  name: string
  message: string
  stack?: string
  metadata?: ObjectLiteral
}

interface ExceptionInterface {
  toJSON: () => SerializedException
}

export abstract class Exception extends Error implements ExceptionInterface {
  public abstract readonly name: EXCEPTION

  constructor(public readonly message: string, public readonly metadata?: ObjectLiteral) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      metadata: this.metadata,
    }
  }
}
