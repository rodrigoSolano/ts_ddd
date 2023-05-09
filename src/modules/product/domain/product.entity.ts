import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '../../../libs/ddd';
import { ProductProps } from './product.types';

export class ProductEntity extends AggregateRoot<ProductProps> {
  protected readonly _id: string;

  static create(create: ProductProps): ProductEntity {
    const id = uuid();

    const props: ProductProps = { ...create };

    const product = new ProductEntity({ id, props });

    return product;
  }

  delete(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
