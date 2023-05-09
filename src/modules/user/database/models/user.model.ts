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

  // methods
  public static async createWithAddress({
    id,
    name,
    email,
    street,
    postalCode,
    country,
  }: {
    id: string;
    name: string;
    email: string;
    street: string;
    postalCode: string;
    country: string;
  }): Promise<UserModel> {
    const user = await UserModel.create({ id, name, email });
    await Address.create({ street, postalCode, country, userId: user.id });
    return user;
  }
}
