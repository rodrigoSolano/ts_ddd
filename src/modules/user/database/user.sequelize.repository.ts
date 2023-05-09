import { EventEmmiter } from '../../../libs/core/event-emmiter/event-emmiter';
import { SequelizeRepositoryBase } from '../../../libs/db/sequelize-repository.base';
import { Logger } from '../../../libs/logger/logger';
import { UserEntity } from '../domain/user.entity';
import { USER_REPOSITORY } from '../user.di-tokens';
import { UserMapper } from '../user.mapper';
import AddressModel from './models/address.model';
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
      const copy = entity.getPropsCopy();

      // create the user
      const user = new UserModel({
        id: copy.id,
        email: copy.email,
        name: copy.name,
      });

      // create the address
      const address = new AddressModel({
        street: copy.address.street,
        country: copy.address.country,
        postalCode: copy.address.postalCode,
      });

      // set the association
      user.address = address;
      address.user = user;

      // save the user
      await user.save();
      await address.save();

      // publish the events
      entity.publishEvents(this.logger, this.eventEmmiter);
    } catch (error) {
      this.logger.error(error);
      console.log(error);
    }
  }

  async createWithAddress(entity: UserEntity): Promise<void> {
    try {
      const copy = entity.getPropsCopy();
      await UserModel.createWithAddress({
        id: copy.id,
        name: copy.name,
        email: copy.email,
        street: copy.address.street,
        postalCode: copy.address.postalCode,
        country: copy.address.country,
      });
      entity.publishEvents(this.logger, this.eventEmmiter);
    } catch (error) {
      this.logger.error(error);
      console.log(error);
    }
  }
}
