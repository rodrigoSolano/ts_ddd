import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class IdResponse {
  constructor(id: string) {
    this.id = id;
  }

  @Field({
    description: "Entity's identifier",
  })
  readonly id: string;
}
