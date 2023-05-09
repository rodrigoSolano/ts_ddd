import { Service } from 'typedi';
import { IQueryHandler } from '../../../../libs/core/query-bus/query-bus';
import { Ok, Result } from 'oxide.ts';
import { Paginated } from '../../../../libs/ddd';
import { QueryHandler } from '../../../../libs/core/query-bus/query-handler.decorator';
import { Op } from 'sequelize';
import { FindProductsQuery } from './find-products.query';
import ProductModel from '../../database/models/product.model';

@Service()
@QueryHandler(FindProductsQuery)
export class FindProductsQueryHandler implements IQueryHandler {
  async execute(
    query: FindProductsQuery,
  ): Promise<Result<Paginated<ProductModel>, Error>> {
    const { limit, offset, name } = query;

    const products = await ProductModel.findAndCountAll({
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
        data: products.rows,
        count: products.count,
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}
