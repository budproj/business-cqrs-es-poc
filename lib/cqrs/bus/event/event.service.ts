import Action, { ActionConstructor } from '@lib/cqrs/bus/action/action'

export interface EventServiceInterface {
  buildEvent: <P = any>(eventName: string, payload: P) => Action
}

export type EventHashmap = Record<string, ActionConstructor>

abstract class EventService implements EventServiceInterface {
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

export default EventService
