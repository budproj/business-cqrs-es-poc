import { ActionMetadata } from 'lib/cqrs/bus/action/dtos'
import { QueryDTO, QueryParameters } from 'lib/cqrs/bus/query/dtos'

import { READ_ALL_REGISTRATION } from './constants'

export class ReadAllRegistrationQueryDTO extends QueryDTO<never> {
  public metadata: ActionMetadata

  constructor(public readonly payload: never, { previousAction }: Partial<QueryParameters> = {}) {
    super({
      previousAction,
      name: READ_ALL_REGISTRATION,
    })
  }
}
