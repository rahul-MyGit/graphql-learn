import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 4000,
    DATABASE_URI: process.env.DATABASE_URI || 'postgres://postgres:postgres@localhost:5432/test',
    GRAPHQL_PATH: process.env.GRAPHQL_PATH || '/graphql',
    NODE_ENV: process.env.NODE_ENV || 'development',
    AUTH_TOKEN: process.env.AUTH_TOKEN || 'auth-token',
}