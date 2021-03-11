import { Injectable, OnApplicationBootstrap } from '@nestjs/common'

import { USER_AGGREGATE_NAME } from '@core/modules/user/constants'
import { EventStoreAdapterProvider } from '@infrastructure/adapters/event-store/event-store.provider'

import { EventStoreProjection } from './base.projection'

@Injectable()
export class UserAccountProjection extends EventStoreProjection implements OnApplicationBootstrap {
  protected get resultStreamName() {
    return 'user-account'
  }

  protected get query() {
    return `
    fromCategory('${USER_AGGREGATE_NAME}')
      .when({
        $init: () => ({}),

        CreatedUser: (state, event) => {
          const { aggregateID } = event.metadata
          const aggregateData = state[aggregateID]

          state[aggregateID] = {
            ...aggregateData,
            firstName: event.data.firstName,
          }
        }
      })
  `
  }

  constructor(protected readonly eventStore: EventStoreAdapterProvider) {
    super()
  }

  public async onApplicationBootstrap() {
    this.sync()
  }
}
