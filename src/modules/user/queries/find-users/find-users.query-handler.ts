import { Service } from 'typedi';
import { IQueryHandler } from '../../../../libs/core/query-bus/query-bus';
import { QueryHandler } from '../../../../libs/core/query-bus/query-handler.decorator';
import { FindUsersQuery } from './find-users.query';
import { Paginated } from '../../../../libs/ddd';
import { Ok, Result } from 'oxide.ts';

import User from '../../database/user.model';
import { Op } from 'sequelize';

@Service()
@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler {
  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: FindUsersQuery,
  ): Promise<Result<Paginated<User>, Error>> {
    const { limit, offset, name } = query;

    const users = await User.findAndCountAll({
      where: {
        name: {
          // name puede ser undefined, por eso se usa el operador ||
          [Op.like]: `%${name || ''}%`,
        },
      },
      limit,
      offset,
    });

    return Ok(
      new Paginated({
        data: users.rows,
        count: users.count,
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}
