import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { QueryBus } from '../../../../libs/core/query-bus/query-bus';
import { UserPaginatedGraphqlResponseDto } from '../../dtos/graphql/user.paginated-gql-response.dto';
import { FindUsersQuery } from './find-users.query';
import { Result } from 'oxide.ts/dist';
import User from '../../database/models/user.model';
import { Paginated } from '../../../../libs/ddd';
import { ResponseBase } from '../../../../libs/api/response.base';

@Service()
@Resolver(() => UserPaginatedGraphqlResponseDto)
export class FindUsersGraphqlResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => UserPaginatedGraphqlResponseDto)
  async findUsers(
    @Arg('name', { nullable: true })
    name?: string,
  ): Promise<UserPaginatedGraphqlResponseDto> {
    const query = new FindUsersQuery({ name });
    const result: Result<Paginated<User>, Error> = await this.queryBus.execute(
      query,
    );

    const paginated = result.unwrap();

    const response = new UserPaginatedGraphqlResponseDto({
      ...paginated,
      data: paginated.data.map((user) => ({
        ...new ResponseBase(user),
        email: user.email,
        name: user.name,
      })),
    });
    return response;
  }
}
