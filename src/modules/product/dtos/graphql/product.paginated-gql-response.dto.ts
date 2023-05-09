import { Field, ObjectType } from 'type-graphql';
import { ProductGraphqlResponseDto } from './product.graphql-response.dto';
import { PaginatedGraphqlResponse } from '../../../../libs/api/graphql/paginated.graphql-response.base';

@ObjectType()
export class ProductPaginatedGraphqlResponseDto extends PaginatedGraphqlResponse(
  ProductGraphqlResponseDto,
) {
  @Field(() => [ProductGraphqlResponseDto])
  data: ProductGraphqlResponseDto[];
}
