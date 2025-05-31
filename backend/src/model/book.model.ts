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

    extend type Query {
        bookList: [Book]!
        book(id: ID!): Book!
    }

    extend type Mutation {
        bookCreate(input: BookInput!): Book
        bookUpdate(id: ID!, input: BookInput!): Book
        bookDelete(id: ID!): Book
    }
`

export const BookResolver = {
    Query: {
        bookList: async (_: any, __: any, { req }: GraphContext) => {
            authMiddlewareGraphql(req);
            const books = await prisma.booking.findMany({
                where: {
                    userId: req.user?.id
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return books;
        },
        book: async (_: any, { id }: any, { req }: GraphContext) => {
            authMiddlewareGraphql(req);
            const book = await prisma.booking.findUnique({
                where: { id }
            });
            return book;
        }
    },
    Mutation: {
        bookCreate: async (_: any, { input }: any, { req }: GraphContext) => {
            authMiddlewareGraphql(req);
            const book = await prisma.booking.create({
                data: {
                    ...input,
                    userId: req.user?.id,
                }
            })
            return book;
        },
        bookUpdate: async (_: any, { id, input }: any, { req }: GraphContext) => {
            authMiddlewareGraphql(req);
            const book = await prisma.booking.update({
                where: { id, userId: req.user?.id },
                data: input
            })
            return book;
        },
        bookDelete: async (_: any, { id }: any, { req }: GraphContext) => {
            authMiddlewareGraphql(req);
            const book = await prisma.booking.delete({
                where: { id, userId: req.user?.id }
            })
            return book;
        }
    }
}