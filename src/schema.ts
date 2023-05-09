import 'reflect-metadata';
import Container from 'typedi';
import { buildSchema as typeGraphqlBuildSchema } from 'type-graphql';

import { resolvers as UserGraphqlResolvers } from './modules/user/user.module';
import { resolvers as ProductGraphqlResolvers } from './modules/product/product.module';
import { GraphQLSchema } from 'graphql';

export const buildSchema = (): Promise<GraphQLSchema> =>
  typeGraphqlBuildSchema({
    resolvers: [...UserGraphqlResolvers, ...ProductGraphqlResolvers],
    container: Container,
  });
