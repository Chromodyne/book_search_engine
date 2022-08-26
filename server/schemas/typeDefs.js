//Import GraphQL
const { gql } = require("graphql");

//Setup required type definitions.
//TODO: BookInput may be wrong. Check it out if issues arise.
const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login:(email: String!, password: String! ): Auth
        addUser:(username: String!, email: String!, password: String!): Auth
        saveBook: (bookInfo: BookInput!): User
        removeBook: (bookId: ID!): User
    }

    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId:
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

`