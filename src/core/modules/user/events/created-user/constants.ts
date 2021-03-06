import { USER_AGGREGATE_NAME } from '@core/modules/user/constants'
import { EVENT_PREFIX } from '@infrastructure/bus/event/constants'

export const CREATED_USER_EVENT = `${EVENT_PREFIX}::${USER_AGGREGATE_NAME}::CREATED`
