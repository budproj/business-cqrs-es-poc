import { ActionService } from 'lib/bus/action/services'
import { CommandDTO } from 'lib/bus/command/dtos'

import { EventDTO } from './dtos'

export interface EventProviderInterface {
  buildEvent: <P = any>(eventName: string, payload: P) => EventDTO
}

export type EventHashmap = Record<string, EventDTOConstructor>
type EventDTOConstructor = new (...arguments_: any[]) => EventDTO

export abstract class EventProvider extends ActionService implements EventProviderInterface {
  constructor(protected readonly events: EventHashmap) {
    super()
  }

  public buildEvent<P = any>(eventName: string, payload: P, command?: CommandDTO): EventDTO<P> {
    const EventDTO = this.events[eventName]
    const tracing = this.buildTrace<CommandDTO>(command)
    const event = new EventDTO(payload)

    event.setTracing(tracing)

    return event
  }
}
