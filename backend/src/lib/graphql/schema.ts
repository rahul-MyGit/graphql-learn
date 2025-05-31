import {merge} from 'lodash';
import { GlobalTypeDef } from './global.schema.js';
import { BookResolver, BookTypeDef } from '../../types/book.model.js';

export const typeDefs = [GlobalTypeDef, BookTypeDef]
export const resolvers = merge([BookResolver])