[![MIT License][license-shield]][license-url]

## Showoff Hasura Power

[![Product Name Screen Shot][product-screenshot]](https://analytics.cool.bio)

This is an open source Analytics Project to keep track our project. Simple, Safe and Fair.

Here's why:

- Hasura is :sparkling_heart:
- Super flexilabels
- Access to API as well :smile:

### Built With

- [Hasura](https://hasura.io)
- [React](https://reactjs.org)
- [Cloudflare](https://cloudflare.com)

## Use cases

- Show country wise view count for today/last 7 days/ last 30 days.

    For example, How many visiters I had from which country for today or last 7 days or 30 days?

  1. create a view goin to hasura console -> data -> sql runner -> run

     ```sh
     CREATE OR REPLACE VIEW "public"."all_session_counts_country" AS
        SELECT
        date_trunc('day' :: text, session.created_at) AS day,
        session.country,
        count(session.id) AS count
        FROM
        session
        GROUP BY
        (date_trunc('day' :: text, session.created_at)),
        session.country;
     ```

  2. Query with graphql from playground

        ```sh
            query checkWithDelta($at: timestamptz_comparison_exp) {
                countries: all_session_counts_country (
                    where: {
                        day: $at
                    }
                ) {
                    count
                    country
                }
            }

        ```
    3. Pass the variables

        ```sh
        {
            "at":{
                "_eq": "2021-04-22"
            }
        }
        ```
    

- Show count of sessions and deltas with distinct ip count for today/last 7 days/ last 30 days.
    For example, How many total unique visiters I had for today or last 7 days or 30 days?

  1. create a view goin to hasura console -> data -> sql runner -> run

     ```sh
     CREATE
        OR REPLACE VIEW "public"."all_session_counts_views_delta" AS WITH grp AS (
        SELECT
            t.ipaddress,
            t.pid,
            t.datea,
            sum(t.cnt) AS counta
        FROM
            session,
            LATERAL (
            SELECT
                session.project_id AS pid,
                session.ip AS ipaddress,
                date(session.created_at) AS datea,
                1 AS cnt
            UNION ALL
            SELECT
                session.project_id AS pid,
                session.ip AS ipaddress,
                (date(session.created_at) + 1) AS date,
                0 AS cnt
            ) t
        GROUP BY
            t.datea,
            t.pid,
            t.ipaddress
        )
        SELECT
        t1.ipaddress,
        t1.pid,
        t1.datea AS date,
        t1.counta AS count,
        COALESCE((t1.counta - t2.counta), t1.counta) AS delta
        FROM
        (
            grp t1
            LEFT JOIN grp t2 ON (((t2.datea + 1) = t1.datea))
        )
        ORDER BY
        t1.datea;
     ```

  2. Query with graphql from playground

        ```sh
        query checkWithDelta($at: timestamptz_comparison_exp) {
            all_session_counts_views_delta_aggregate(
                distinct_on: ipaddress
                where: { date: $at }
                ) {
                aggregate {
                    sum {
                    count
                    delta
                    }
                }
            }
        }

        ```
    3. Pass the variables

        ```sh
        {
            "at":{
                "_eq": "2021-04-22"
            }
        }
        ```
- Show sessions count and deltas for today/last 7 days/ last 30 days.
For example, How many total visiters I had for today or last 7 days or 30 days?
  1. create a view goin to hasura console -> data -> sql runner -> run

     ```sh
     CREATE
        OR REPLACE VIEW "public"."all_session_counts_views_delta" AS WITH grp AS (
        SELECT
            t.ipaddress,
            t.pid,
            t.datea,
            sum(t.cnt) AS counta
        FROM
            session,
            LATERAL (
            SELECT
                session.project_id AS pid,
                session.ip AS ipaddress,
                date(session.created_at) AS datea,
                1 AS cnt
            UNION ALL
            SELECT
                session.project_id AS pid,
                session.ip AS ipaddress,
                (date(session.created_at) + 1) AS date,
                0 AS cnt
            ) t
        GROUP BY
            t.datea,
            t.pid,
            t.ipaddress
        )
        SELECT
        t1.ipaddress,
        t1.pid,
        t1.datea AS date,
        t1.counta AS count,
        COALESCE((t1.counta - t2.counta), t1.counta) AS delta
        FROM
        (
            grp t1
            LEFT JOIN grp t2 ON (((t2.datea + 1) = t1.datea))
        )
        ORDER BY
        t1.datea;
     ```

  2. Query with graphql from playground

        ```sh
        query checkCountWithDelta($at: timestamptz_comparison_exp) {
            all_session_counts_views_delta_aggregate(
                where: { date: $at }
                ) {
                aggregate {
                    sum {
                    count
                    delta
                    }
                }
            }
        }

        ```
    3. Pass the variables

        ```sh
        {
            "at":{
                "_eq": "2021-04-22"
            }
        }
        ```

[license-url]: https://github.com/subhendukundu/cool-bio-analytics/blob/main/LICENSE
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[product-screenshot]: https://analytics.cool.bio/cool-bio-analytics-demo-dark.png
