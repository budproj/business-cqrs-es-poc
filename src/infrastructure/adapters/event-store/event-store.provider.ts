import { EventStoreDBClient } from '@eventstore/db-client'
import { SingleNodeOptions } from '@eventstore/db-client/dist/Client'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { EventStoreConfig } from '@config/event-store'

interface EventStoreAdapterProviderInterface {
  client: EventStoreDBClient
}

// Since Event Store is not exporting ChannelCredentialOptions, we need to "mock" it
// Source: https://github.com/EventStore/EventStore-Client-NodeJS/blob/aea591f1f073961c02c1a4492142ba4be7485977/src/Client/index.ts#L79
type ChannelCredentialOptions = {
  insecure?: boolean
}

@Injectable()
export class EventStoreAdapterProvider implements EventStoreAdapterProviderInterface {
  public readonly client: EventStoreDBClient

  constructor(private readonly configService: ConfigService) {
    const clientConfigs = this.buildConfigs()
    this.client = new EventStoreDBClient(...clientConfigs)
  }

  private buildConfigs(): [SingleNodeOptions, ChannelCredentialOptions] {
    const eventStoreConfig = this.configService.get<EventStoreConfig>('eventStore')
    const defaultEndpoint = 'localhost:2113'

    const clusterConfig = {
      endpoint: eventStoreConfig
        ? `${eventStoreConfig.cluster.endpoint.host}:${eventStoreConfig.cluster.endpoint.port}`
        : defaultEndpoint,
    }
    const credentialConfig = {
      insecure: eventStoreConfig?.credential.insecure,
    }

    return [clusterConfig, credentialConfig]
  }
}
