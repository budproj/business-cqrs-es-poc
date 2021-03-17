import {
  ActionMetadata,
  ActionMetadataInterface,
  ActionMetadataProperties,
} from '@infrastructure/bus/action/metadata'

interface EventMetadataInterface extends ActionMetadataInterface {
  aggregateID: string
  version: number
}

type EventMetadataProperties = {
  aggregateID: string
  version: number
} & ActionMetadataProperties

export class EventMetadata extends ActionMetadata implements EventMetadataInterface {
  public readonly aggregateID: string
  public readonly version: number

  constructor({ aggregateID, version, ...rest }: EventMetadataProperties) {
    super(rest)

    this.aggregateID = aggregateID
    this.version = version
  }
}
