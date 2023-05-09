import { Arg, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { ProductPaginatedGraphqlResponseDto } from '../../dtos/graphql/product.paginated-gql-response.dto';
import { QueryBus } from '../../../../libs/core/query-bus/query-bus';
import { ResponseBase } from '../../../../libs/api/response.base';
import { Result } from 'oxide.ts';
import { Paginated } from '../../../../libs/ddd';
import { FindProductsQuery } from './find-products.query';
import ProductModel from '../../database/models/product.model';

@Service()
@Resolver(() => ProductPaginatedGraphqlResponseDto)
export class FindProductsGraphqlResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ProductPaginatedGraphqlResponseDto)
  async findProducts(
    @Arg('name', { nullable: true })
    name?: string,
  ): Promise<ProductPaginatedGraphqlResponseDto> {
    const query = new FindProductsQuery({ name });
    const result: Result<
      Paginated<ProductModel>,
      Error
    > = await this.queryBus.execute(query);

    const paginated = result.unwrap();

    const response = new ProductPaginatedGraphqlResponseDto({
      ...paginated,
      data: paginated.data.map((product) => ({
        ...new ResponseBase(product),
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
      })),
    });
    return response;
  }
}
