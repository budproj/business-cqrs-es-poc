import { v4 as uuidv4 } from 'uuid'

interface ActionMetadataInterface {
  id: string
  name: string
  timestamp: number
}

class ActionMetadata implements ActionMetadataInterface {
  public readonly id: string
  public readonly timestamp: number

  constructor(public readonly name: string) {
    this.id = uuidv4()
    this.timestamp = Date.now()
  }
}

export default ActionMetadata
