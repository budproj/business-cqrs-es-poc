import {
  ActionMetadata,
  ActionMetadataInterface,
  ActionMetadataProperties,
} from '@infrastructure/bus/action/metadata'

interface EventMetadataInterface extends ActionMetadataInterface {
  version: number
}

interface EventMetadataProperties extends ActionMetadataProperties {
  version: number
}

export class EventMetadata extends ActionMetadata implements EventMetadataInterface {
  public readonly version: number

  constructor({ version, ...rest }: EventMetadataProperties) {
    super(rest)
    this.version = version
  }
}
