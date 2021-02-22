import { EventDTO } from './dtos'

export interface EventProviderInterface {
  buildEvent: <P = any>(eventName: string, payload: P) => EventDTO
}

export type EventHashmap = Record<string, EventDTOConstructor>
type EventDTOConstructor = new (...arguments_: any[]) => EventDTO

export abstract class EventProvider implements EventProviderInterface {
  constructor(protected readonly events: EventHashmap) {}

  public buildEvent<P = any>(eventName: string, payload: P): EventDTO<P> {
    const EventDTO = this.events[eventName]
    const event = new EventDTO(payload)

    return event
  }
}
