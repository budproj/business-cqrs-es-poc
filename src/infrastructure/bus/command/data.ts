import { ActionData } from '@infrastructure/bus/action/data'

export abstract class CommandData<D = any> extends ActionData<D> {}
