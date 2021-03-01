import ActionMetadata, {
  ActionMetadataInterface,
  ActionMetadataProperties,
} from '@lib/cqrs/bus/action/metadata'
import ID from '@lib/ddd/value-objects/id.value-object'

import EventName from './event-name.value-object'

interface EventMetadataInterface extends ActionMetadataInterface {
  name: EventName
}

class EventMetadata extends ActionMetadata implements EventMetadataInterface {
  public readonly id!: ID
  public readonly name: EventName
  public readonly timestamp!: Date

  constructor({ name }: ActionMetadataProperties) {
    super({ name })
    this.name = new EventName(name)
  }
}

export default EventMetadata
