import { EventEmmiter } from '../../../libs/core/event-emmiter/event-emmiter';
import { SequelizeRepositoryBase } from '../../../libs/db/sequelize-repository.base';
import { Logger } from '../../../libs/logger/logger';
import { ProductEntity } from '../domain/product.entity';
import { ProductMapper } from '../product.mapper';
import { ProductRepositoryPort } from './product.repository.port';

import { PRODUCT_REPOSITORY } from '../product.di-tokens';

import ProductModel from './models/product.model';
import { Service } from 'typedi';

@Service(PRODUCT_REPOSITORY)
export default class SequelizeProductRepository
  extends SequelizeRepositoryBase<ProductEntity, ProductModel>
  implements ProductRepositoryPort
{
  protected model: ProductModel;

  constructor(
    productMapper: ProductMapper,
    eventEmmiter: EventEmmiter,
    logger: Logger,
  ) {
    super(productMapper, ProductModel, eventEmmiter, logger);
  }
}
