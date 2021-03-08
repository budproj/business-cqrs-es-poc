import { ID } from '@core/common/domain/value-objects/id.value-object'
import {
  ActionMetadata,
  ActionMetadataInterface,
  ActionMetadataProperties,
  UnmarshalledActionMetadata,
} from '@infrastructure/bus/action/metadata'

interface EventMetadataInterface extends ActionMetadataInterface {
  aggregateID: ID
  version: number

  unmarshal: () => UnmarshalledEventMetadata
}

interface EventMetadataProperties extends ActionMetadataProperties {
  aggregateID: ID
  version: number
}

export interface UnmarshalledEventMetadata extends UnmarshalledActionMetadata {
  aggregateID: string
  version: number
}

export class EventMetadata extends ActionMetadata implements EventMetadataInterface {
  public readonly aggregateID: ID
  public readonly version: number

  constructor({ aggregateID, version, ...rest }: EventMetadataProperties) {
    super(rest)

    this.aggregateID = aggregateID
    this.version = version
  }

  public unmarshal() {
    const unmarshalledActionEventMetadata = super.unmarshal()
    const umarshalledEventMetadata: UnmarshalledEventMetadata = {
      ...unmarshalledActionEventMetadata,
      aggregateID: this.aggregateID.value,
      version: this.version,
    }

    return umarshalledEventMetadata
  }
}
