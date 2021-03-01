import { EVENT_PREFIX } from '@lib/cqrs/bus/event/constants'
import { USER_AGGREGATE_NAME } from '@modules/user/constants'

export const CREATED_USER_EVENT = `${EVENT_PREFIX}::${USER_AGGREGATE_NAME}::CREATED`
