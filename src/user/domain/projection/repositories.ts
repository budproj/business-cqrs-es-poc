import { MongoRepository, EntityRepository } from 'typeorm'

import { NewUserEntity } from 'src/user/infrastructure/entities'

@EntityRepository(NewUserEntity)
export class NewUserProjectionRepository extends MongoRepository<NewUserEntity> {}

const UserDomainRepositories = [NewUserProjectionRepository]

export default UserDomainRepositories
