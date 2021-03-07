import { IsUUID } from 'class-validator'

import { QueryData } from '@infrastructure/bus/query/data'

interface ReadUserAccountRequestProperties {
  aggregateID: string
}

export class ReadUserAccountRequest extends QueryData<ReadUserAccountRequestProperties> {
  @IsUUID('4')
  public readonly aggregateID: string

  constructor({ aggregateID }: ReadUserAccountRequestProperties) {
    super()
    this.aggregateID = aggregateID
  }
}
