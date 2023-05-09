import { Service } from 'typedi';
import { IQueryHandler } from '../../../../libs/core/query-bus/query-bus';
import { QueryHandler } from '../../../../libs/core/query-bus/query-handler.decorator';
import { FindUsersQuery } from './find-users.query';
import { Paginated } from '../../../../libs/ddd';
import { Ok, Result } from 'oxide.ts';

import { Op } from 'sequelize';
import UserModel from '../../database/models/user.model';
import AddressModel from '../../database/models/address.model';

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
  ): Promise<Result<Paginated<UserModel>, Error>> {
    const { limit, offset, name } = query;

    const users = await UserModel.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name || ''}%`,
        },
      },
      limit,
      offset,
      include: [{ model: AddressModel }],
    });
    console.log(users.rows);

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
