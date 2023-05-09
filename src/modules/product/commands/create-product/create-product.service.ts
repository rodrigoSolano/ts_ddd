import { Inject, Service } from 'typedi';
import { CommandHandler } from '../../../../libs/core/command-bus/command-handler.decorator';
import { CreateProductCommand } from './create-product.command';
import { ICommandHandler } from '../../../../libs/core/command-bus/command-bus';
import { AggregateID } from '../../../../libs/ddd';
import { PRODUCT_REPOSITORY } from '../../product.di-tokens';
import { ProductEntity } from '../../domain/product.entity';
import SequelizeProductRepository from '../../database/product.sequelize.repository';

@Service()
@CommandHandler(CreateProductCommand)
export class CreateProductService
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    protected readonly productRepository: SequelizeProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<AggregateID> {
    const product = ProductEntity.create({
      name: command.name,
      description: command.description,
      price: command.price,
      stock: command.stock,
      image: command.image,
    });

    try {
      await this.productRepository.insert(product);
      return product.id;
    } catch (error: any) {
      throw error;
    }
  }
}
