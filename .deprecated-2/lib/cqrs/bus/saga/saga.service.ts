import { Type } from '@nestjs/common'
import { IEvent, ofType } from '@nestjs/cqrs'
import deepmerge from 'deepmerge'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'

import Action, { ActionConstructor } from '@lib/cqrs/bus/action/action'

import { DEFAULT_SAGA_DELAY } from './constants'

interface SagaServiceInterface {
  react: (
    observableEvents: Observable<any>,
    Event: Type<IEvent>,
    Command: ActionConstructor,
    providedConfig?: SagaServiceConfigInterface,
  ) => Observable<Action>
}

export interface SagaServiceConfigInterface {
  millisecondsToWait?: number
}

const sagaServiceDefaultConfig: SagaServiceConfigInterface = {
  millisecondsToWait: DEFAULT_SAGA_DELAY,
}

abstract class SagaService implements SagaServiceInterface {
  public react(
    observableEvents: Observable<any>,
    Event: Type<IEvent>,
    Command: ActionConstructor,
    providedConfig: SagaServiceConfigInterface = {},
  ) {
    const config = deepmerge(sagaServiceDefaultConfig, providedConfig)

    return observableEvents.pipe(
      ofType(Event),
      delay(config.millisecondsToWait),
      map((event) => new Command(event)),
    )
  }
}

export default SagaService
