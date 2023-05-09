import { PaginatedResponseDto } from '../../../libs/api/paginated.response.base';
import { ProductResponseDto } from './product.response.dto';

export class ProductPaginatedResponseDto extends PaginatedResponseDto<ProductResponseDto> {
  readonly data: readonly ProductResponseDto[];
}
