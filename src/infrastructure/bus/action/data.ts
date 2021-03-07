import { Dictionary, fromPairs } from 'lodash'

interface ActionDataInterface<T> {
  unmarshal: () => Dictionary<T>
}

export abstract class ActionData<T = any> implements ActionDataInterface<T> {
  public unmarshal() {
    const entries = Object.entries(this)
    const objectLiteral = fromPairs<T>(entries)

    return objectLiteral
  }
}
