import { Action } from '@infrastructure/bus/action/action'

export abstract class Command<D = any> extends Action<D> {}
