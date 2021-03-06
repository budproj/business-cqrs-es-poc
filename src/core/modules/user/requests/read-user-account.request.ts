import { IsUUID } from 'class-validator'

import { QueryPayload } from '@infrastructure/bus/query/payload'

interface ReadUserAccountRequestProperties {
  aggregateID: string
}

export class ReadUserAccountRequest extends QueryPayload {
  @IsUUID('4')
  public readonly aggregateID: string

  constructor({ aggregateID }: ReadUserAccountRequestProperties) {
    super()
    this.aggregateID = aggregateID
  }
}
