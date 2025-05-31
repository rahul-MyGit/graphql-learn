import { GraphQLError } from 'graphql';
import { Request } from 'express';
import { ENV } from '../../config';

export const authMiddlewareGraphql = ( req: Request) => {
    const authHeader = req.headers?.authorization ?? '';

    if (!authHeader) {
        throw new GraphQLError('Not authorized', {
            extensions: {
                code: 'UNAUTHENTICATED',
            },
        });
    }

    const token = authHeader.split(' ')[1];

    if (token !== ENV.AUTH_TOKEN) {
        throw new GraphQLError('Not authorized', {
            extensions: {
                code: 'UNAUTHENTICATED',
            },
        });
    }

    return;

}