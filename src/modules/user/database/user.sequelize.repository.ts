import { EventEmmiter } from '../../../libs/core/event-emmiter/event-emmiter';
import { SequelizeRepositoryBase } from '../../../libs/db/sequelize-repository.base';
import { Logger } from '../../../libs/logger/logger';
import { UserEntity } from '../domain/user.entity';
import { USER_REPOSITORY } from '../user.di-tokens';
import { UserMapper } from '../user.mapper';
import UserModel from './models/user.model';

import User from './models/user.model';
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

  async insert(entity: UserEntity): Promise<void> {
    try {
      console.log('insert', entity);
      const copy = entity.getPropsCopy();
      await UserModel.create({
        id: entity.id,
        email: copy.email,
        name: copy.name,
      });
      entity.publishEvents(this.logger, this.eventEmmiter);
    } catch (error) {
      this.logger.error(error);
      console.log(error);
    }
  }
}
