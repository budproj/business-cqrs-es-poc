export interface EventStoreConfig {
  cluster: EventStoreClusterConfig
  credential: EventStoreCredentialConfig
}

interface EventStoreClusterConfig {
  endpoint: EventStoreClusterEndpointConfig
}

interface EventStoreClusterEndpointConfig {
  host: string
  port: number
}

interface EventStoreCredentialConfig {
  insecure: boolean
}

const {
  EVENTSTORE_CLUSTERHOST,
  EVENTSTORE_CLUSTERPORT,
  EVENTSTORE_CREDENTIAL_INSECURE,
} = process.env

const DEFAULT_CLUSTER_HOST = 'localhost'
const DEFAULT_CLUSTER_PORT = 2113
const DEFAULT_CREDENTIAL_INSECURE = false

export const eventStoreConfig: EventStoreConfig = {
  cluster: {
    endpoint: {
      host: EVENTSTORE_CLUSTERHOST ?? DEFAULT_CLUSTER_HOST,
      port: EVENTSTORE_CLUSTERPORT
        ? Number.parseInt(EVENTSTORE_CLUSTERPORT, 10)
        : DEFAULT_CLUSTER_PORT,
    },
  },

  credential: {
    insecure: EVENTSTORE_CREDENTIAL_INSECURE
      ? EVENTSTORE_CREDENTIAL_INSECURE?.toUpperCase() === 'TRUE'
      : DEFAULT_CREDENTIAL_INSECURE,
  },
}

export function createEventStoreConfig(): EventStoreConfig {
  return eventStoreConfig
}
