import { Result } from 'oxide.ts';
import { Service } from 'typedi';
import { Args, Mutation, Query, Resolver } from 'type-graphql';

import { CommandBus } from '../../../../libs/core/command-bus/command-bus';
import { AggregateID } from '../../../../libs/ddd';

import { UserAlreadyExistsError } from '../../domain/user.errors';

import { CreateUserGqlRequestDto } from './dtos/create-user.gql-request.dto';

import { IdGqlResponse } from '../../../../libs/api/graphql/id.gql-response.dto';
import { CreateUserCommand } from './create-user.command';

@Service()
@Resolver(() => IdGqlResponse)
export class CreateUserGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello World';
  }

  @Mutation(() => IdGqlResponse)
  async createUser(
    @Args() input: CreateUserGqlRequestDto,
  ): Promise<IdGqlResponse> {
    const command = new CreateUserCommand(input);

    const id: Result<AggregateID, UserAlreadyExistsError> =
      await this.commandBus.execute(command);

    return new IdGqlResponse(id.unwrap());
  }
}
