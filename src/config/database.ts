import { DataSource } from 'typeorm';
import { User } from '../models/user';
import { Token } from '../models/token';

export const connection = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Token],
  synchronize: true,
  logging: false,
  extra: process.env.POSTGRES_HOST
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : null,
});
