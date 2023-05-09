import { Mapper } from '../../libs/ddd';
import { Service } from 'typedi';
import { UserEntity } from './domain/user.entity';
import User from './database/models/user.model';
import { UserResponseDto } from './dtos/user.response.dto';
import { Address } from './domain/value-objects/address.value-object';
import { UserRoles } from './domain/user.types';
import AddressModel from './database/models/address.model';
import UserModel from './database/models/user.model';

@Service()
export class UserMapper implements Mapper<UserEntity, User, UserResponseDto> {
  toPersistence(entity: UserEntity): User {
    const copy = entity.getPropsCopy();
    const user = new User(
      {
        id: copy.id,
        email: copy.email,
        name: copy.name,
        address: new Address({
          street: 'Avenida 1',
          country: 'México',
          postalCode: '94330',
        }),
      },
      {
        include: [AddressModel],
      },
    );
    return user;
  }
  toDomain(record: UserModel): UserEntity {
    const entity = new UserEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        name: record.name,
        email: record.email,
        role: UserRoles.admin,
        address: new Address({
          street: record.address.street,
          postalCode: record.address.postalCode,
          country: record.address.country,
        }),
      },
    });
    return entity;
  }
  toResponse(entity: UserEntity): UserResponseDto {
    console.log('toResponse', entity);
    throw new Error('Method not implemented.');
  }
}
