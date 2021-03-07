import { ActionData } from '@infrastructure/bus/action/data'

export abstract class QueryData<D = any> extends ActionData<D> {}
