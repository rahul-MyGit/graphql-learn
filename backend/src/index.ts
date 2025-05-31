import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import { ENV } from './config';
import http from 'http';
import { typeDefs, resolvers } from './lib/graphql/schema.js';
import { GraphContext } from './types';
import { authRouter } from './routes/auth';
import { protectedRouter } from './routes/protected';


const app = express();
const httpServer = http.createServer(app);

function initMiddleware(appRef: typeof app) {
    appRef.use(cors());
    appRef.use(express.urlencoded({ extended: true, limit: '2mb' }));
    appRef.use(express.json({ limit: '2mb' }));
    // appRef.use(asyncErrorMiddleware);
}

const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: ENV.NODE_ENV !== 'production',
});



async function init() {
    try {
        await apolloServer.start();
        initMiddleware(app);

        app.get('/', (_, res) => res.send('Hello World'));

        // Add auth routes
        app.use('/api/auth', authRouter);
        
        // Add protected routes
        app.use('/api', protectedRouter);

        app.use(ENV.GRAPHQL_PATH, expressMiddleware(apolloServer, {
            context: async ({ req }) => {
                return {
                    req,
                } as GraphContext;
            },
        }));

        await new Promise<void>((resolve) => {
            httpServer.listen({ port: ENV.PORT }, () => {
                console.log(`Server is running on port ${ENV.PORT} with path ${ENV.GRAPHQL_PATH}`);
                resolve();
            });
        });
    } catch (error) {
        console.error('Error starting server', error);
    }
}

init();