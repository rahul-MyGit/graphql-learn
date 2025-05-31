import { Request } from 'express';

export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: string;
            GRAPHQL_PATH: string;
            DATABASE_URI: string;
            AUTH_TOKEN: string;
            JWT_SECRET: string;
        }
    }

    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
            }
        }
    }
}