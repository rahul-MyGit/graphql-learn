import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 4000,
    DATABASE_URI: process.env.DATABASE_URI || 'postgres://postgres:postgres@localhost:5432/test',
}