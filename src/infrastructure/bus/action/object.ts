import { v4 as uuidv4 } from 'uuid'

export abstract class ActionObject {
  protected generateID(): string {
    return uuidv4()
  }

  protected generateTimestamp(): number {
    return Date.now()
  }
}
