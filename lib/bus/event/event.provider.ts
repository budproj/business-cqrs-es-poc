import Action, { ActionConstructor } from '@lib/bus/action/action'

export interface EventProviderInterface {
  buildEvent: <P = any>(eventName: string, payload: P) => Action
}

export type EventHashmap = Record<string, ActionConstructor>

abstract class EventProvider implements EventProviderInterface {
  constructor(protected readonly events: EventHashmap) {}

  public buildEvent<P = any, C = any>(
    eventName: string,
    payload?: P,
    command?: Action<C>,
  ): Action<P> {
    const EventDTO = this.events[eventName]
    const event = new EventDTO(payload, { previousAction: command })

    return event
  }
}

export default EventProvider
