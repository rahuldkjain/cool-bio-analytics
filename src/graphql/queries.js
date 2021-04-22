import { gql } from '@apollo/client'

export const GET_ALL_PROJECTS = gql`
  query allProjects($userId: uuid!) {
    project(where: { user_id: { _eq: $userId } }) {
      name: domain
      key: project_id
    }
  }
`
export const GET_PROJECTS_DETAILS = gql`
  query checkWithDelta(
    $projectId: uuid!
    $at: date_comparison_exp
    $createdAt: timestamptz_comparison_exp
  ) {
    users: all_session_counts_views_delta_aggregate(
      distinct_on: ipaddress
      where: { pid: { _eq: $projectId }, date: $at }
    ) {
      aggregate {
        sum {
          count
          delta
        }
      }
    }
    sessions: all_session_counts_views_delta_aggregate(
      where: { pid: { _eq: $projectId }, date: $at }
    ) {
      aggregate {
        sum {
          count
          delta
        }
      }
    }
    project: project_by_pk(project_id: $projectId) {
      domain
      timezone
      active: sessions_aggregate(
        where: { created_at: $createdAt }
        distinct_on: ip
      ) {
        aggregate {
          count
        }
      }
      totalViews: sessions_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const GET_SESSIONS_COUNT_WITH_COUNTRY = gql`
  query checkWithDelta($projectId: uuid!, $at: timestamptz_comparison_exp) {
    countries: all_session_counts_country(
      where: { project_id: { _eq: $projectId }, day: $at }
    ) {
      count
      country
    }
  }
`
