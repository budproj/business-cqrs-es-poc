import { COMMAND_PREFIX } from 'lib/bus/command/constants'
import { USER_AGGREGATE_NAME } from 'src/user/constants'

export const CREATE_USER = `${COMMAND_PREFIX}::${USER_AGGREGATE_NAME}::CREATE`
