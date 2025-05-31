import { gql } from 'graphql-tag';
import { GraphContext } from '../types/common';

import { PrismaClient } from '../../generated/prisma'
import { authMiddlewareGraphql } from '../middleware';
const prisma = new PrismaClient()

export const BookTypeDef = gql`
    type Book {
        id: ID!
        userId: ID
        title: String
        author: String
        year: Int
        genre: String
        publisher: String
        createdAt: Date
        updatedAt: Date
    }

    input BookInput {
        title: String
        author: String
        year: Int
        genre: String
        publisher: String
    }

    extend type Mutation {
        bookCreate(input: BookInput!): Book
    }
`

export const BookResolver = {
    Mutation: {
        bookCreate: async (_: any, {input}: any, {req}: GraphContext) => {
            await authMiddlewareGraphql(req);
            const book = await prisma.booking.create({
                data: {
                    ...input,
                    // userId: req.user.id,
                }
            })
            return book;
        }
    }
}