import { gql } from "@apollo/client";

export const GET_ALL_PROJECTS = gql`
    query allProjects($userId: uuid!) {
        project(where: { user_id: { _eq: $userId } }) {
            name: domain
            key: project_id
        }
    }
`;
export const GET_PROJECT_DETAILS_BY_ID_FOR_SETTINGS = gql`
    query checkWithDelta($projectId: uuid!) {
        project: project_by_pk(project_id: $projectId) {
            domain
            timezone
            subscriptions {
                price {
                    product {
                        name
                    }
                }
            }
        }
    }
`;

export const GET_PROJECT_CURRENT_PLAN = gql`
    query checkWithDelta($projectId: uuid!) {
        project: project_by_pk(project_id: $projectId) {
            subscriptions {
                price {
                    product {
                        id
                    }
                }
            }
            sessions: sessions_aggregate {
                aggregate {
                    count
                }
            }
        }
    }
`;

export const GET_PROJECTS_DETAILS = gql`
    query checkWithDelta(
        $projectId: uuid!
        $at: timestamptz_comparison_exp
        $updatedAt: timestamptz_comparison_exp
    ) {
        users: unique_session_counts_users_aggregate(
            where: { project_id: { _eq: $projectId }, date: $at }
        ) {
            aggregate {
                sum {
                    count
                    delta
                }
            }
        }
        sessions: all_session_counts_views_delta_aggregate(
            where: { project_id: { _eq: $projectId }, date: $at }
            distinct_on: ip
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
                where: { updated_at: $updatedAt }
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
`;

export const GET_SESSIONS_COUNT_WITH_COUNTRY = gql`
    query checkWithDelta($projectId: uuid!, $at: timestamptz_comparison_exp) {
        table: all_session_counts_country(
            where: { project_id: { _eq: $projectId }, day: $at }
        ) {
            count
            country
            countryName: all_session_counts_country_table {
                name
            }
        }
    }
`;

export const GET_SESSIONS_USERS_COUNT_WITH_COUNTRY = gql`
    query checkWithDelta($projectId: uuid!, $at: timestamptz_comparison_exp) {
        table: unique_session_counts_country(
            where: { project_id: { _eq: $projectId }, day: $at }
        ) {
            count
            country
        }
    }
`;

export const GET_SESSIONS_BOUNCE_COUNT_WITH_COUNTRY = gql`
    query checkWithDelta($projectId: uuid!, $at: timestamptz_comparison_exp) {
        table: all_session_counts_bounce_country(
            where: { date: $at, project_id: { _eq: $projectId } }
        ) {
            count: bounce
            country
        }
    }
`;

export const GET_SESSIONS_WITH_COUNTRY = gql`
    query checkWithDelta($projectId: uuid!, $at: timestamptz_comparison_exp) {
        table: all_session_active_counts_country(
            where: { project_id: { _eq: $projectId }, day: $at }
        ) {
            count
            country
            day
        }
    }
`;

export const GET_SESSIONS_COUNT_WITH_CLIENT_NAME = gql`
    query checkBrowsersWithDelta(
        $projectId: uuid!
        $at: timestamptz_comparison_exp
    ) {
        table: all_session_counts_client_name(
            where: { project_id: { _eq: $projectId }, day: $at }
        ) {
            count
            client_name
        }
    }
`;

export const GET_SESSIONS_COUNT_WITH_PAGES = gql`
    query checkPagesWithDelta(
        $projectId: uuid!
        $at: timestamptz_comparison_exp
    ) {
        table: all_session_counts_pages(
            where: { project_id: { _eq: $projectId }, day: $at }
        ) {
            count
            pathname
        }
    }
`;
export const GET_SESSIONS_COUNT_WITH_REFERRER = gql`
    query checkReferrerWithDelta(
        $projectId: uuid!
        $at: timestamptz_comparison_exp
    ) {
        table: all_session_counts_referrer(
            where: { project_id: { _eq: $projectId }, day: $at }
        ) {
            count
            referrer
        }
    }
`;
export const GET_SESSIONS_COUNT_WITH_FOR_MINIGRAPHS = gql`
    query checkForMinigraphs(
        $projectId: uuid!
        $at: timestamptz_comparison_exp
    ) {
        sessions: all_session_counts_views_delta_per_hour(
            where: { date: $at, project_id: { _eq: $projectId } }
            order_by: { date: desc }
        ) {
            date
            count
        }
        users: all_session_counts_views_delta_per_hour(
            where: { date: $at, project_id: { _eq: $projectId } }
            distinct_on: ip
        ) {
            date
            count
        }
        active: all_session_counts_ip_hour(
            where: { project_id: { _eq: $projectId }, hour: $at }
        ) {
            date: hour
            count
        }
    }
`;
export const GET_SESSIONS_COUNT_FOR_TIMESERIES = gql`
    query checkWithDelta($projectId: uuid!, $at: timestamptz_comparison_exp) {
        sessions: all_session_counts_by_hour(
            where: { project_id: { _eq: $projectId }, hour: $at }
            order_by: { hour: asc }
        ) {
            count
            hour
        }
        users: all_session_counts_ip_hour(
            where: { project_id: { _eq: $projectId }, hour: $at }
            order_by: { hour: asc }
        ) {
            count
            hour
        }
        active: all_session_counts_by_hour(
            where: { project_id: { _eq: $projectId }, hour: $at }
            order_by: { hour: asc }
        ) {
            count
            hour
        }
        bounce: all_session_counts_bounce_hour(
            where: { project_id: { _eq: $projectId }, hour: $at }
            order_by: { hour: asc }
        ) {
            count: bounce
            hour
        }
    }
`;
