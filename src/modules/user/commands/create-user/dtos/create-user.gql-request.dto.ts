import { ArgsType, Field, InputType } from 'type-graphql';
import { IsAlphanumeric, IsEmail, IsString } from 'class-validator';

@ArgsType()
@InputType()
export class CreateUserGqlRequestDto {
  @IsEmail()
  @Field()
  readonly email: string;

  @IsString()
  @Field()
  readonly country: string;

  @IsAlphanumeric()
  @Field()
  readonly postalCode: string;

  @Field()
  readonly street: string;
}
