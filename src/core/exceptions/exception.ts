import { ObjectLiteral } from '@lib/types/object-literal'

import { EXCEPTION } from './constants'

interface SerializedException {
  name: string
  message: string
  stack?: string
  metadata?: ObjectLiteral
}

interface ExceptionInterface {
  toJSON: () => SerializedException
}

abstract class Exception extends Error implements ExceptionInterface {
  abstract name: EXCEPTION

  constructor(readonly message: string, readonly metadata?: ObjectLiteral) {
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

export default Exception
