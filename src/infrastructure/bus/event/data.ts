import { Dictionary } from 'lodash'

import { ActionData } from '@infrastructure/bus/action/data'

export type UnmarshalledEventData<D> = Dictionary<D>

export abstract class EventData<D = any> extends ActionData<D> {
  public abstract unmarshal(): UnmarshalledEventData<D>
}
