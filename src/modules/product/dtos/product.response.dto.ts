import { ResponseBase } from '../../../libs/api/response.base';

export class ProductResponseDto extends ResponseBase {
  name: string;

  description: string;

  price: number;

  stock: number;

  image: string;
}
