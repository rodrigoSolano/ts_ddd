import { Sequelize } from 'sequelize-typescript';
import User from './modules/user/database/user.model';

export default async function initSequelize(): Promise<void> {
  const sequelize = new Sequelize({
    database: 'test',
    dialect: 'mysql',
    username: 'root',
    password: 'solano',
    storage: ':memory:',
    models: [User],
    logging: false,
  });
  await sequelize.authenticate();
  console.log('Sequelize initialized');
  await sequelize.sync();
  console.log('Sequelize synced');
}
