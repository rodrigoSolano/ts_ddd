import { Table, Column, Model, HasOne } from 'sequelize-typescript';
import Address from './address.model';

@Table({ tableName: 'users' })
export default class UserModel extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @HasOne(() => Address)
  address: Address;
}
