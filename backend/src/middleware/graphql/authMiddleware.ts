import { GraphQLError } from 'graphql';
import { Request } from 'express';
import { verifyToken } from '../../lib/jwt';

export const authMiddlewareGraphql = (req: Request) => {
    const authHeader = req.headers?.authorization ?? '';

    if (!authHeader) {
        throw new GraphQLError('Not authorized', {
            extensions: {
                code: 'UNAUTHENTICATED',
            },
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        throw new GraphQLError('Not authorized', {
            extensions: {
                code: 'UNAUTHENTICATED',
            },
        });
    }

    try {
        const decoded = verifyToken(token);
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
    } catch (error) {
        throw new GraphQLError('Invalid token', {
            extensions: {
                code: 'UNAUTHENTICATED',
            },
        });
    }

    return;
}