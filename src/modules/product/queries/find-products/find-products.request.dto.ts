import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class FindProductsRequestDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly name?: string;
}
