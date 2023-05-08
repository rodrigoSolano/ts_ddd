import { Field, ObjectType } from 'type-graphql';
import { ResponseBase } from '../../../../libs/api/response.base';

@ObjectType()
export class UserGraphqlResponseDto extends ResponseBase {
  @Field({
    description: "User's identifier",
  })
  id: string;

  @Field({
    description: "User's name",
  })
  name: string;

  @Field({
    description: "User's email address",
  })
  email: string;
}
