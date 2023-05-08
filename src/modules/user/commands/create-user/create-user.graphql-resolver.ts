import { Result } from 'oxide.ts/dist';
import { Service } from 'typedi';
import { Args, Mutation, Query, Resolver } from 'type-graphql';

import { CommandBus } from '../../../../libs/core/command-bus/command-bus';
import { AggregateID } from '../../../../libs/ddd';

import { UserAlreadyExistsError } from '../../domain/user.errors';

import { IdGqlResponse } from './dtos/id.gql-response.dto';
import { CreateUserGqlRequestDto } from './dtos/create-user.gql-request.dto';

import { CreateUserCommand } from './create-user.command';
import { UserCreatedDomainEvent } from '../../domain/events/user-created.domain-event';
import { OnEvent } from '../../../../libs/core/event-emmiter/event-emmiter.decorator';

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

  @OnEvent(UserCreatedDomainEvent.name)
  async onUserCreated(event: UserCreatedDomainEvent): Promise<void> {
    console.log('User created, event: ', event);
  }
}
