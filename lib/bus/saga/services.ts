import { Type } from '@nestjs/common'
import { IEvent, ofType } from '@nestjs/cqrs'
import deepmerge from 'deepmerge'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'

import { CommandDTO } from 'lib/bus/command/dtos'
import { CommandDTOConstructor } from 'lib/bus/command/services'
import { DEFAULT_SAGA_DELAY } from 'lib/bus/saga/constants'

interface SagaProviderInterface {
  react: (
    observableEvents: Observable<any>,
    Event: Type<IEvent>,
    Command: CommandDTOConstructor,
    providedConfig?: SagaProviderConfigInterface,
  ) => Observable<CommandDTO>
}

export interface SagaProviderConfigInterface {
  millisecondsToWait?: number
}

const sagaProviderDefaultConfig: SagaProviderConfigInterface = {
  millisecondsToWait: DEFAULT_SAGA_DELAY,
}

export abstract class SagaProvider implements SagaProviderInterface {
  public react(
    observableEvents: Observable<any>,
    Event: Type<IEvent>,
    Command: CommandDTOConstructor,
    providedConfig?: SagaProviderConfigInterface,
  ) {
    const config = deepmerge(sagaProviderDefaultConfig, providedConfig)

    return observableEvents.pipe(
      ofType(Event),
      delay(config.millisecondsToWait),
      map((event) => new Command(event)),
    )
  }
}
