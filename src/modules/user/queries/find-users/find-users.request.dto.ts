import { MaxLength, IsString, Matches, IsOptional } from 'class-validator';

export class FindUsersRequestDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly name?: string;
}
