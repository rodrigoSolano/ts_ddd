import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class IdGqlResponse {
  constructor(id: string) {
    this.id = id;
  }

  @Field()
  readonly id: string;
}
