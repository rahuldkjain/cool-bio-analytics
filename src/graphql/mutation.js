import { gql } from '@apollo/client'

export const INSERT_PROJECT = gql`
    mutation insertProject($item: [project_insert_input!]!) {
        insert_project(objects:$item){
        affected_rows
        }
    }
`
