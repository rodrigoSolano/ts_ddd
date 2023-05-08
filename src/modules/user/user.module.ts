import { CreateUserGraphqlResolver } from './commands/create-user/create-user.graphql-resolver';
import { CreateUserService } from './commands/create-user/create-user.service';
import { DeteleUserGraphqlResolver } from './commands/delete-user/delete-user.graphql-resolver';
import { FindUsersGraphqlResolver } from './queries/find-users/find-users.graphql-resolver';
import { FindUsersQueryHandler } from './queries/find-users/find-users.query-handler';

// eslint-disable-next-line @typescript-eslint/ban-types
export const resolvers: [Function, ...Function[]] = [
  CreateUserGraphqlResolver,
  DeteleUserGraphqlResolver,
  FindUsersGraphqlResolver,
];
export const commandHandlers = [CreateUserService];
export const queyHandlers = [FindUsersQueryHandler];
