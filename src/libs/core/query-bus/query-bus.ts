import 'reflect-metadata';
import { Service } from 'typedi';
import { QueryBase } from '../../ddd/query.base';

export interface IQueryHandler<TQuery extends QueryBase = any, TResult = any> {
  execute(query: TQuery): Promise<TResult>;
}

export interface IQueryBus<Query extends QueryBase = QueryBase> {
  execute<T extends Query, R = any>(query: T): Promise<R>;
}

@Service()
export class QueryBus implements IQueryBus<QueryBase> {
  private handlers: Map<string, any> = new Map();

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  registerHandler(queryClass: any, handler: any): void {
    this.handlers.set(queryClass.name, handler);
  }

  async execute<T extends QueryBase, R = any>(query: T): Promise<R> {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) {
      throw new Error(
        `No handler registered for query ${query.constructor.name}`,
      );
    }
    return handler.execute(query) as R;
  }
}
