import { Arg, Mutation, Resolver } from 'type-graphql';
import { DeleteUserCommand } from './delete-user.service';
import { CommandBus } from '../../../../libs/core/command-bus/command-bus';
import { NotFoundException } from '../../../../libs/exceptions';
import { Result, match } from 'oxide.ts';
import { Service } from 'typedi';

@Service()
@Resolver()
export class DeteleUserGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string): Promise<boolean> {
    const command = new DeleteUserCommand({ userId: id });
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
