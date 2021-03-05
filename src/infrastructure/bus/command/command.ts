import { Action } from '@infrastructure/bus/action/action'

export abstract class Command<P = any> extends Action<P> {}
