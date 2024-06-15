import { gql } from "@apollo/client";

export const LOAD_BOOKS = gql`
    query Books {
        books {
            author
            coverPhotoURL
            readingLevel
            title
        }
    }
`