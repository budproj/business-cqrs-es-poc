import { QueryBus } from '@nestjs/cqrs'

import { QueryDTO } from './dtos'

export interface QueryDispatcherInterface {
  dispatch: <R = any, P = any>(queryName: string, payload: P, correlationID?: string) => Promise<R>
}

export type QueryHashmap = Record<string, QueryDTOConstructor>
export type QueryDTOConstructor = new (...arguments_: any[]) => QueryDTO

export abstract class QueryDispatcher implements QueryDispatcherInterface {
  constructor(protected readonly queries: QueryHashmap, protected readonly queryBus: QueryBus) {}

  public async dispatch<R = any, P = any>(queryName: string, payload?: P) {
    const QueryDTO = this.queries[queryName]
    const query = new QueryDTO(payload)

    const result = await this.queryBus.execute<QueryDTO<P>, R>(query)

    return result
  }
}
