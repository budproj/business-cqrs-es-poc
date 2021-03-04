import ActionMetadata, {
  ActionMetadataInterface,
  ActionMetadataProperties,
} from '@lib/cqrs/bus/action/metadata'
import ID from '@lib/ddd/value-objects/id.value-object'

import CommandName from './command-name.value-object'

interface CommandMetadataInterface extends ActionMetadataInterface {
  name: CommandName
}

class CommandMetadata extends ActionMetadata implements CommandMetadataInterface {
  public readonly id!: ID
  public readonly name: CommandName
  public readonly timestamp!: Date

  constructor({ name }: ActionMetadataProperties) {
    super({ name })
    this.name = new CommandName(name)
  }
}

export default CommandMetadata
