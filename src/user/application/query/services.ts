import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'

import { QueryDispatcher, QueryHashmap } from 'lib/bus/query/services'

import { READ_ALL_REGISTRATION } from './constants'
import { ReadAllRegistrationQueryDTO } from './dtos'

@Injectable()
export class UserApplicationQueryDispatcher extends QueryDispatcher {
  public readonly queries: QueryHashmap

  constructor(protected readonly queryBus: QueryBus) {
    super(
      {
        [READ_ALL_REGISTRATION]: ReadAllRegistrationQueryDTO,
      },
      queryBus,
    )
  }
}
