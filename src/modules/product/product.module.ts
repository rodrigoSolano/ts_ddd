import { CreateProductGraphqlResolver } from './commands/create-product/create-product.graphql-resolver';
import { CreateProductService } from './commands/create-product/create-product.service';
import { DeleteProductGraphqlResolver } from './commands/delete-product/delete-product-graphql-resolver';
import { FindProductsGraphqlResolver } from './queries/find-products/find-products.graphql-resolver';
import { FindProductsQueryHandler } from './queries/find-products/find-products.query-handler';

const resolvers = [
  CreateProductGraphqlResolver,
  DeleteProductGraphqlResolver,
  FindProductsGraphqlResolver,
];

const commandHandlers = [CreateProductService];

const queryHandlers = [FindProductsQueryHandler];

export { resolvers, commandHandlers, queryHandlers };
