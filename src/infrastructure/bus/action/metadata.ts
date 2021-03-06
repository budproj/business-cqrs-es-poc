import { ActionObject } from '@infrastructure/bus/action/object'

export interface ActionMetadataInterface {
  id: string
  name: string
  timestamp: number
}

export interface ActionMetadataProperties {
  name: string
}

export class ActionMetadata extends ActionObject implements ActionMetadataInterface {
  public readonly id: string
  public readonly name: string
  public readonly timestamp: number

  constructor({ name }: ActionMetadataProperties) {
    super()
    this.id = this.generateID()
    this.timestamp = this.generateTimestamp()
    this.name = name
  }
}
