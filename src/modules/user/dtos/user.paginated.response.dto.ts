import { PaginatedResponseDto } from '../../../libs/api/paginated.response.base';
import { UserResponseDto } from './user.response.dto';

export class UserPaginatedResponseDto extends PaginatedResponseDto<UserResponseDto> {
  readonly data: readonly UserResponseDto[];
}
