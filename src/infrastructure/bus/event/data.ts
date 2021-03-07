import { ActionData } from '@infrastructure/bus/action/data'

export abstract class EventData<D = any> extends ActionData<D> {
  public abstract unmarshal(): any
}
