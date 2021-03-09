import { Injectable, OnApplicationBootstrap } from '@nestjs/common'

import { USER_AGGREGATE_NAME } from '@core/modules/user/constants'
import { EventStoreAdapterProvider } from '@infrastructure/adapters/event-store/event-store.provider'

const USER_ACCOUNT_PROJECTION_NAME = 'user-account'
const USER_ACCOUNT_PROJECTION_QUERY = `
  fromCategory('${USER_AGGREGATE_NAME}')
    .when({
        $init: () => ({}),

        CreatedUser: (state, event) => {
          const { aggregateID } = event.metadata
          const aggregateData = state[aggregateID]
          const versionHandlers = {
              1: () => {
                state[aggregateID] = {
                    ...aggregateData,
                    firstName: event.data.firstName,
                }
              }
          }

          const eventVersionHandler = versionHandlers[event.metadata.version]
          eventVersionHandler()
        }
    })
`

@Injectable()
export class UserAccountProjection implements OnApplicationBootstrap {
  constructor(private readonly eventStore: EventStoreAdapterProvider) {}

  public async onApplicationBootstrap() {
    console.log(String(UserAccountProjection))
    // Move query string to a method inside this class (we can use String to stringify it afterwards)
    // Abstract logic to extract aggregateID
    // Abstract logic to select version handler (with fallback logic)
    // Create interface to define the most recent (active) version
    // Stringify everythin with String(this.blabla)
    // Code upsert logic to eventStore adapter that will check if  the projection query has changed and update it if so
    // Maybe add a logic to start the projection itself
    // Await this.eventStore.upsertProjection(USER_ACCOUNT_PROJECTION_NAME, USER_ACCOUNT_PROJECTION_QUERY)
  }
}
