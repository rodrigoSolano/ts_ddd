import { Arg, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { CommandBus } from '../../../../libs/core/command-bus/command-bus';
import { DeleteProductCommand } from './delete-product.service';
import { Result, match } from 'oxide.ts';
import { NotFoundException } from '../../../../libs/exceptions';

@Service()
@Resolver()
export class DeleteProductGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id') id: string): Promise<boolean> {
    const command = new DeleteProductCommand({ id });
    const result: Result<boolean, NotFoundException> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (isOk: boolean) => isOk,
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new NotFoundException(error.message);
        throw error;
      },
    });
  }
}
