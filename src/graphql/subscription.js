import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  subscription getProjects {
    project {
      domain
      projectId: project_id
      createdAt: created_at
      timezone
      shareId: share_id
    }
  }
`
