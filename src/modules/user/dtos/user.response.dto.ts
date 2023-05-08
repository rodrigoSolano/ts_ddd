import { ResponseBase } from '../../../libs/api/response.base';

export class UserResponseDto extends ResponseBase {
  email: string;

  country: string;

  postalCode: string;

  street: string;
}
