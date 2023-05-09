import { Sequelize } from 'sequelize-typescript';
import { dirname } from 'path';

export default async function initSequelize(): Promise<void> {
  const sequelize = new Sequelize({
    database: 'test',
    dialect: 'mysql',
    username: 'root',
    password: 'solano',
    storage: ':memory:',
    models: [dirname(__dirname) + '/**/*.model.ts'],
    logging: false,
  });
  await sequelize.authenticate();
  console.log('Sequelize initialized');
  await sequelize.sync({
    force: true,
  });
  console.log('Sequelize synced');
}
