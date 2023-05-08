import {
  PaginatedParams,
  PaginatedQueryBase,
} from '../../../../libs/ddd/query.base';

export class FindUsersQuery extends PaginatedQueryBase {
  readonly name?: string;

  constructor(props: PaginatedParams<FindUsersQuery>) {
    super(props);
    this.name = props.name;
  }
}
