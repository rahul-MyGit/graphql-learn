import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { ENV } from './config';

async function init() {
    const app = express();

    app.use(express.json());

    const server = new ApolloServer({
        typeDefs: `
            type Query {
                say: String
            }
        `,
        resolvers: {
            Query: {
                say: () => 'Hello World from res'
            }
        },
    });

    await server.start();

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server),
    );


    app.listen(ENV.PORT, () => {
        console.log(`Server is running on port ${ENV.PORT}`);
    });
}

init();