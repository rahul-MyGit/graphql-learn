import { gql } from 'graphql-tag';
import _ from 'lodash';
import { GraphContext } from './common';

import { PrismaClient } from '../../generated/prisma'

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