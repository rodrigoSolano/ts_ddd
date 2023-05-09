import { Args, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { IdGqlResponse } from '../../../../libs/api/graphql/id.gql-response.dto';
import { CommandBus } from '../../../../libs/core/command-bus/command-bus';
import { CreateProductGqlRequestDto } from './dtos/create-product.gql-request.dto';
import { AggregateID } from '../../../../libs/ddd';
import { CreateProductCommand } from './create-product.command';

@Service()
@Resolver(() => IdGqlResponse)
export class CreateProductGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => IdGqlResponse)
  async createProduct(
    @Args() input: CreateProductGqlRequestDto,
  ): Promise<IdGqlResponse> {
    const command = new CreateProductCommand(input);

    const id: AggregateID = await this.commandBus.execute(command);

    return new IdGqlResponse(id);
  }
}
