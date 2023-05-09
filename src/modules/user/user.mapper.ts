import { Mapper } from '../../libs/ddd';
import { Service } from 'typedi';
import { UserEntity } from './domain/user.entity';
import { UserResponseDto } from './dtos/user.response.dto';
import { Address } from './domain/value-objects/address.value-object';
import { UserRoles } from './domain/user.types';
import UserModel from './database/models/user.model';
import AddressModel from './database/models/address.model';

@Service()
export class UserMapper
  implements Mapper<UserEntity, UserModel, UserResponseDto>
{
  toPersistence(entity: UserEntity): UserModel {
    const copy = entity.getPropsCopy();
    const user = new UserModel(
      {
        id: copy.id,
        email: copy.email,
        name: copy.name,
        address: new AddressModel({
          street: copy.address.street,
          country: copy.address.country,
          postalCode: copy.address.postalCode,
        }),
      },
      { include: [AddressModel] },
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
