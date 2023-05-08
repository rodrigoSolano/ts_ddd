import { EventEmmiter } from '../../../libs/core/event-emmiter/event-emmiter';
import { SequelizeRepositoryBase } from '../../../libs/db/sequelize-repository.base';
import { Logger } from '../../../libs/logger/logger';
import { UserEntity } from '../domain/user.entity';
import { USER_REPOSITORY } from '../user.di-tokens';
import { UserMapper } from '../user.mapper';

import User from './user.model';
import { UserRepositoryPort } from './user.repository.port';
import { Service } from 'typedi';

@Service(USER_REPOSITORY)
export class SequelizeUserRepository
  extends SequelizeRepositoryBase<UserEntity, User>
  implements UserRepositoryPort
{
  protected model: User;

  constructor(
    userMapper: UserMapper,
    eventEmmiter: EventEmmiter,
    logger: Logger,
  ) {
    super(userMapper, User, eventEmmiter, logger);
  }
}
