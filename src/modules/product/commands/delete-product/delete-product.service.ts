import { Command, CommandProps } from '../../../../libs/ddd';
import { Inject, Service } from 'typedi';
import { ICommandHandler } from '../../../../libs/core/command-bus/command-bus';
import { CommandHandler } from '../../../../libs/core/command-bus/command-handler.decorator';
import SequelizeProductRepository from '../../database/product.sequelize.repository';
import { PRODUCT_REPOSITORY } from '../../product.di-tokens';
import { Err, Ok, Result } from 'oxide.ts';
import { NotFoundException } from '../../../../libs/exceptions';

export class DeleteProductCommand extends Command {
  id: string;

  constructor(props: CommandProps<DeleteProductCommand>) {
    super(props);
    this.id = props.id;
  }
}

@Service()
@CommandHandler(DeleteProductCommand)
export class DeleteProductService implements ICommandHandler {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    protected readonly productRepo: SequelizeProductRepository,
  ) {}

  async execute(
    command: DeleteProductCommand,
  ): Promise<Result<boolean, NotFoundException>> {
    const found = await this.productRepo.findOneById(command.id);
    if (found.isNone()) return Err(new NotFoundException());
    const product = found.unwrap();
    product.delete();
    const result = await this.productRepo.delete(product);
    return Ok(result);
  }
}
