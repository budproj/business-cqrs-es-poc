import { USER_AGGREGATE_NAME } from '@core/user/constants'
import { COMMAND_PREFIX } from '@infrastructure/bus/command/constants'

export const CREATE_USER_COMMAND = `${COMMAND_PREFIX}::${USER_AGGREGATE_NAME}::CREATE`
