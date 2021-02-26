import Action, { ActionConstructor } from '@lib/bus/action/action.dto'
import { Type } from '@nestjs/common'
import { IEvent, ofType } from '@nestjs/cqrs'
import deepmerge from 'deepmerge'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'

import { DEFAULT_SAGA_DELAY } from './constants'

interface SagaProviderInterface {
  react: (
    observableEvents: Observable<any>,
    Event: Type<IEvent>,
    Command: ActionConstructor,
    providedConfig?: SagaProviderConfigInterface,
  ) => Observable<Action>
}

export interface SagaProviderConfigInterface {
  millisecondsToWait?: number
}

const sagaProviderDefaultConfig: SagaProviderConfigInterface = {
  millisecondsToWait: DEFAULT_SAGA_DELAY,
}

abstract class SagaProvider implements SagaProviderInterface {
  public react(
    observableEvents: Observable<any>,
    Event: Type<IEvent>,
    Command: ActionConstructor,
    providedConfig: SagaProviderConfigInterface = {},
  ) {
    const config = deepmerge(sagaProviderDefaultConfig, providedConfig)

    return observableEvents.pipe(
      ofType(Event),
      delay(config.millisecondsToWait),
      map((event) => new Command(event)),
    )
  }
}

export default SagaProvider
