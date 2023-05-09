import {
  PaginatedParams,
  PaginatedQueryBase,
} from '../../../../libs/ddd/query.base';

export class FindProductsQuery extends PaginatedQueryBase {
  readonly name?: string;

  constructor(props: PaginatedParams<FindProductsQuery>) {
    super(props);
    this.name = props.name;
  }
}
