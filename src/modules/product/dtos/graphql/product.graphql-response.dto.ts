import { Field, ObjectType } from 'type-graphql';
import { ResponseBase } from '../../../../libs/api/response.base';

@ObjectType()
export class ProductGraphqlResponseDto extends ResponseBase {
  @Field({
    description: "Product's identifier",
  })
  id: string;

  @Field({
    description: "Product's name",
  })
  name: string;

  @Field({
    description: "Product's description",
  })
  description: string;

  @Field({
    description: "Product's price",
  })
  price: number;

  @Field({
    description: "Product's quantity",
  })
  stock: number;

  @Field({
    description: "Product's image",
  })
  image: string;
}
