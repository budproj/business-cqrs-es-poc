import { Dictionary, fromPairs } from 'lodash'

interface QueryDataInterface<T> {
  unmarshal: () => Dictionary<T>
}

export abstract class QueryData<T = any> implements QueryDataInterface<T> {
  public unmarshal() {
    const entries = Object.entries(this)
    const objectLiteral = fromPairs<T>(entries)

    return objectLiteral
  }
}
