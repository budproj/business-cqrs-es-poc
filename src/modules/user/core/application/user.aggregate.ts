// import CQRSAggregate from '@lib/cqrs/aggregate'
// import { Logger } from '@nestjs/common'
// import { v4 as uuidv4 } from 'uuid'
// import Action from '@lib/cqrs/bus/action/action'
// import UserEventService from './events/user.events.service'
//
// interface UserAggregateRootInterface {
//   create: (newUser: NewUserDTO) => void
// }
//
// class UserAggregateRoot extends CQRSAggregate implements UserAggregateRootInterface {
//   protected readonly logger = new Logger(UserAggregateRoot.name)
//
//   constructor(
//     protected readonly command: Action,
//     protected readonly eventService: UserEventService,
//   ) {
//     super()
//   }
//
//   public create(newUser: NewUserCommandPayload) {
//     const user = {
//       ...newUser,
//       userID: uuidv4(),
//     }
//
//     this.logger.log({
//       newUser,
//       user,
//       message: `New create user request received`,
//     })
//
//     const event = this.eventProvider.buildEvent<NewUserDTO>(CREATED_USER, user, this.command)
//     this.apply(event)
//   }
// }
//
// export default UserAggregateRoot
