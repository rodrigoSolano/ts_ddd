import { RepositoryPort } from '../../../libs/ddd';
import { ProductEntity } from '../domain/product.entity';

export type ProductRepositoryPort = RepositoryPort<ProductEntity>;
