import http from 'http';
import cors from 'cors';
import express from 'express';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { buildSchema } from './schema';

interface MyContext {
  token?: string;
}

export class App {
  private app: express.Application;
  private server: ApolloServer<MyContext>;
  private httpServer: http.Server;

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.init();
  }

  private async init() {
    await this.initializeApolloServer();
    await this.setupMiddlewares();
  }

  private async initializeApolloServer() {
    this.server = new ApolloServer<MyContext>({
      schema: await buildSchema(),
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
      ],
    });
    await this.server.start();
  }

  private async setupMiddlewares() {
    this.app.use(
      '/',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(this.server, {
        context: async ({ req }) => ({ token: req.headers.token }),
      }),
    );
  }

  async listen(port: number): Promise<void> {
    await this.httpServer.listen({ port });
    console.log(`🚀 Server ready at http://localhost:${port}`);
  }
}
