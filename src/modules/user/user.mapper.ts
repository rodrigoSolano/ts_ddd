import { Mapper } from '../../libs/ddd';
import { Service } from 'typedi';
import { UserEntity } from './domain/user.entity';
import User from './database/user.model';
import { UserResponseDto } from './dtos/user.response.dto';
import { Address } from './domain/value-objects/address.value-object';
import { UserRoles } from './domain/user.types';

@Service()
export class UserMapper implements Mapper<UserEntity, User, UserResponseDto> {
  toPersistence(entity: UserEntity): User {
    const copy = entity.getPropsCopy();
    const user = new User({
      id: copy.id,
      email: copy.email,
      name: 'Rodrigo',
    });
    return user;
  }
  toDomain(record: User): UserEntity {
    const entity = new UserEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        email: record.email,
        role: UserRoles.admin,
        address: new Address({
          street: 'Avenida 1',
          postalCode: '94330',
          country: 'México',
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
