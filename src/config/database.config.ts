import { registerAs } from '@nestjs/config';

export default registerAs('databaseConfig', () => ({
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT ?? '1'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.DB_AUTOLOAD === 'true' ? true : false,
}));
