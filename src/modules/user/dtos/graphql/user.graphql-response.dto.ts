import { Field, ObjectType } from 'type-graphql';
import { ResponseBase } from '../../../../libs/api/response.base';

@ObjectType()
export class AddressGraphqlDto extends ResponseBase {
  @Field({
    description: "Address's street",
  })
  street: string;

  @Field({
    description: "Address's postalCode",
  })
  postalCode: string;

  @Field({
    description: "Address's country",
  })
  country: string;
}

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

  @Field({
    description: "User's address",
  })
  address: AddressGraphqlDto;
}
