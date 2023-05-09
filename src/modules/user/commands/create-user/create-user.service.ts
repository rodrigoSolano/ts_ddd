import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import { Err, Ok, Result } from 'oxide.ts';

import { AggregateID } from '../../../../libs/ddd';
import { ConflictException } from '../../../../libs/exceptions';

import { Address } from '../../domain/value-objects/address.value-object';
import { UserEntity } from '../../domain/user.entity';
import { UserAlreadyExistsError } from '../../domain/user.errors';

import { CreateUserCommand } from './create-user.command';
import { CommandHandler } from '../../../../libs/core/command-bus/command-handler.decorator';
import { ICommandHandler } from '../../../../libs/core/command-bus/command-bus';
import { SequelizeUserRepository } from '../../database/user.sequelize.repository';
import { USER_REPOSITORY } from '../../user.di-tokens';

@Service()
@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepository: SequelizeUserRepository,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<AggregateID, UserAlreadyExistsError>> {
    const user = UserEntity.create({
      name: command.name,
      email: command.email,
      address: new Address({
        country: command.country,
        postalCode: command.postalCode,
        street: command.street,
      }),
    });

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.userRepository.insert(user);
      return Ok(user.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsError(error));
      }
      throw error;
    }
  }
}
