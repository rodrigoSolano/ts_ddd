import 'reflect-metadata';
import { App } from './app';
import initSequelize from './sequelize';

async function bootstrap() {
  await initSequelize();
  const app = new App();
  await app.listen(4000);
}
bootstrap();
