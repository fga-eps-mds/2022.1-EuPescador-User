module.exports = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_HOST,
  extra: process.env.POSTGRES_HOST
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : null,
};
