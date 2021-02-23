import { CommandDTO } from 'lib/bus/command/dtos'
import { MutationResult } from 'lib/models/graphql'

export abstract class GraphQLResolver {
  protected buildMutationResult<P = any>(commandResult: CommandDTO<P>): MutationResult {
    return {
      correlationID: commandResult.tracing.correlationID,
    }
  }
}
