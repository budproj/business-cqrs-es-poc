import { COMMAND_PREFIX } from '@lib/cqrs/bus/command/constants'
import { USER_AGGREGATE_NAME } from '@modules/user/constants'

export const CREATE_USER_COMMAND = `${COMMAND_PREFIX}::${USER_AGGREGATE_NAME}::CREATE`
