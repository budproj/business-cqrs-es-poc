import { Injectable } from '@nestjs/common'

import { EventHashmap, EventProvider } from 'lib/cqrs/bus/event/services'

import { CREATED_USER } from './constants'
import { CreatedUserEventDTO } from './dtos'

@Injectable()
export class UserDomainEventProvider extends EventProvider {
  public readonly events: EventHashmap

  constructor() {
    super({
      [CREATED_USER]: CreatedUserEventDTO,
    })
  }
}
