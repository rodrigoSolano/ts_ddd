import { Column, Model, Table } from 'sequelize-typescript';
import { ProductProps } from '../../domain/product.types';

@Table({ tableName: 'products' })
export default class ProductModel extends Model implements ProductProps {
  @Column({ primaryKey: true })
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  price: number;

  @Column
  stock: number;

  @Column
  image: string;
}
