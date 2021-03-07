import { Action } from '@infrastructure/bus/action/action'

import { CommandData } from './data'

export abstract class Command<D extends CommandData = CommandData> extends Action<D> {
  public readonly data!: D
}
