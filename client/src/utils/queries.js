import { gql } from "graphql";

//User query.

//TODO: Look into how to get the savedBooks array from the user.
export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
        }
    }

`; 