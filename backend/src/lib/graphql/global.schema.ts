import gql from 'graphql-tag';

export const GlobalTypeDef = gql`

    scalar Date
    scalar JSON

    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;
