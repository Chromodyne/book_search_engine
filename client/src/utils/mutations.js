import { gql } from "@apollo/client";

//TODO: IMPORTANT, THESE ARE PLACEHOLDERS. Figure out logic.
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// export const ADD_USER = ;

// export const SAVE_BOOK = ;

// export const REMOVE_BOOK = ;

