import { EVENT_PREFIX } from 'lib/cqrs/bus/event/constants'
import { USER_AGGREGATE_NAME } from 'src/user/constants'

export const CREATED_USER = `${EVENT_PREFIX}::${USER_AGGREGATE_NAME}::CREATED`
