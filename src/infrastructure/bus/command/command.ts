import { Action } from '@infrastructure/bus/action/action'

export abstract class Command<D = unknown> extends Action<D> {}
