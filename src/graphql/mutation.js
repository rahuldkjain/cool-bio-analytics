import { gql } from '@apollo/client'

export const INSERT_WEBSITE = gql`
    mutation insertWebsite($item: [website_insert_input!]!) {
        insert_website(objects:$item){
        affected_rows
        }
    }
`
