import {
  Table,
  Model,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import User from './user.model';

@Table({ tableName: 'addresses' })
export default class AddressModel extends Model {
  @Column
  street: string;

  @Column
  postalCode: string;

  @Column
  country: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column
  userId: string;
}
