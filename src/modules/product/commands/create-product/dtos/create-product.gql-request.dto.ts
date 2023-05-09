import { IsNumber, IsString } from 'class-validator';
import { ArgsType, Field, InputType } from 'type-graphql';

@ArgsType()
@InputType()
export class CreateProductGqlRequestDto {
  @IsString()
  @Field()
  readonly name: string;

  @IsString()
  @Field()
  readonly description: string;

  @IsNumber()
  @Field()
  readonly price: number;

  @IsNumber()
  @Field()
  readonly stock: number;

  @IsString()
  @Field()
  readonly image: string;
}
