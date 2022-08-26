//Import GraphQL
const { gql } = require("graphql");

//Setup required type definitions.
//TODO: Look into input type for mutation on saveBook.
const typeDefs = gql`
    type Query {
        me: User
    }

    type Mutation {
        login:(email: String!, password: String! ): Auth
        addUser:(username: String!, email: String!, password: String!): Auth
        saveBook:
        removeBook:
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

    type Auth {
        token: ID!
        user: User
    }

`