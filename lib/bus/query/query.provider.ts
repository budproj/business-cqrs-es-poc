import { QueryBus } from '@nestjs/cqrs'
import Action, { ActionConstructor } from '@lib/bus/action/action.dto'

export interface QueryProviderInterface {
  dispatch: <R = any, P = any>(queryName: string, payload: P, correlationID?: string) => Promise<R>
}

export type QueryHashmap = Record<string, ActionConstructor>

abstract class QueryProvider implements QueryProviderInterface {
  constructor(protected readonly queries: QueryHashmap, protected readonly queryBus: QueryBus) {}

  public async dispatch<R = any, P = any>(queryName: string, payload?: P) {
    const QueryDTO = this.queries[queryName]
    const query = new QueryDTO(payload)

    const result = await this.queryBus.execute<Action<P>, R>(query)

    return result
  }
}

export default QueryProvider
