import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class User extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  name: string;

  @Column
  email: string;
}
