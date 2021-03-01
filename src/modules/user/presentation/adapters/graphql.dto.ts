import { ObjectType } from '@nestjs/graphql'

import { MutationResult } from '@interface/adapters/graphql.dto'

@ObjectType({
  implements: () => MutationResult,
  description: 'The result data from an user mutation',
})
export class UserMutationResult {
  public readonly correlationID!: string
}
