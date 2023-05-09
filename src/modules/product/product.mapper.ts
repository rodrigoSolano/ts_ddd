import { Service } from 'typedi';
import ProductModel from './database/models/product.model';
import { ProductEntity } from './domain/product.entity';
import { ProductResponseDto } from './dtos/product.response.dto';
import { Mapper } from '../../libs/ddd';

@Service()
export class ProductMapper
  implements Mapper<ProductEntity, ProductModel, ProductResponseDto>
{
  toPersistence(entity: ProductEntity): ProductModel {
    const copy = entity.getPropsCopy();
    const product = new ProductModel({
      id: copy.id,
      name: copy.name,
      description: copy.description,
      price: copy.price,
      stock: copy.stock,
      image: copy.image,
    });

    return product;
  }
  toDomain(record: ProductModel): ProductEntity {
    const entity = new ProductEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        name: record.name,
        description: record.description,
        price: record.price,
        stock: record.stock,
        image: record.image,
      },
    });
    return entity;
  }
  toResponse(entity: ProductEntity): ProductResponseDto {
    console.log('toResponse', entity);
    throw new Error('Method not implemented.');
  }
}
