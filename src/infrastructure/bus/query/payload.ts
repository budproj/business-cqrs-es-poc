import { Dictionary, fromPairs } from 'lodash'

interface QueryPayloadInterface<T> {
  unmarshal: () => Dictionary<T>
}

export abstract class QueryPayload<T = any> implements QueryPayloadInterface<T> {
  public unmarshal() {
    const entries = Object.entries(this)
    const objectLiteral = fromPairs<T>(entries)

    return objectLiteral
  }
}
