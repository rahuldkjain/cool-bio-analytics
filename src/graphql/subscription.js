import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  subscription getProjects {
    website {
      domain
      websiteId: website_id
      createdAt: created_at
      timezone
      shareId: share_id
    }
  }
`
