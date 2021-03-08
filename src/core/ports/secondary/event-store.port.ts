import { EventData, jsonEvent } from '@eventstore/db-client'
import { Injectable } from '@nestjs/common'

import { EventStoreAdapterProvider } from '@infrastructure/adapters/event-store/event-store.provider'
import { UnmarshalledEvent } from '@infrastructure/bus/event/event'

interface EventStorePortInterface {
  publish: (event: EventData, streamName: string) => Promise<void>
  marshalEvent: (event: UnmarshalledEvent) => EventData
}

@Injectable()
export class EventStorePort implements EventStorePortInterface {
  constructor(private readonly eventStore: EventStoreAdapterProvider) {}

  public async publish(event: EventData, streamName: string) {
    await this.eventStore.client.appendToStream(streamName, event)
  }

  public marshalEvent(event: UnmarshalledEvent) {
    const jsonEventPayload = {
      id: event.metadata.id,
      type: event.metadata.type,
      metadata: event.metadata,
      data: event.data,
    }

    return jsonEvent(jsonEventPayload)
  }
}
