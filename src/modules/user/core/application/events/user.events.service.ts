import EventService from '@lib/cqrs/bus/event/event.service'
import { Injectable } from '@nestjs/common'
import CreatedUser from './created-user'

@Injectable()
class UserEventService extends EventService {
  constructor() {
    super({
      [CreatedUser.name]: CreatedUser.event,
    })
  }
}

export default UserEventService
