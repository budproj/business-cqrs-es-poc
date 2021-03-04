import ID from '@lib/ddd/value-objects/id.value-object'

import ActionName from './action-name.value-object'

export interface ActionMetadataInterface {
  id: ID
  name: ActionName
  timestamp: Date
}

export interface ActionMetadataProperties {
  name: string
}

class ActionMetadata implements ActionMetadataInterface {
  public readonly id: ID
  public readonly name: ActionName
  public readonly timestamp: Date

  constructor({ name }: ActionMetadataProperties) {
    this.id = ID.generate()
    this.timestamp = new Date()
    this.name = new ActionName(name)
  }
}

export default ActionMetadata
