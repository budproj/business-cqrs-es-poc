import { Logger } from '@nestjs/common'
import { AggregateRoot, IEvent } from '@nestjs/cqrs'

import { EventProvider } from 'lib/cqrs/bus/event/services'

interface OperationWriteModelInterface {
  apply: (event: IEvent) => void
}

export type OperationWriteModelConstructor = new <
  M extends OperationWriteModel = OperationWriteModel
>(
  ...arguments_: any[]
) => M

export abstract class OperationWriteModel
  extends AggregateRoot
  implements OperationWriteModelInterface {
  protected readonly eventProvider: EventProvider
  protected readonly logger: Logger

  public apply(event: IEvent) {
    this.logger.log({
      event,
      message: 'Dispatching event',
    })

    super.apply(event)
  }
}
