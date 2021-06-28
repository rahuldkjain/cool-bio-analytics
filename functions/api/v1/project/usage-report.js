import { BadRequestError } from "vitedge/errors";

import { stripe } from "../../../utils/helpers";

const getSubscribedProjects = `
    query projectDetails($where: session_bool_exp!) {
        project(where: {
            subscriptions: {
                id: {
                    _is_null: false
                },
                status: {
                    _eq: "active"
                }
                price: {
                    type: {
                        _eq: "recurring"
                    }
                }
            }
        }) {
            subscriptions {
                id: subscription_item_id
            }
            sessions_aggregate(where: $where) {
                aggregate {
                    count
                }
            }
        }
    }
`;

async function getProjects(where) {
    const projects = await fetch(process.env.VITEDGE_GRAPHQL_API, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
                process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
        },
        body: JSON.stringify({
            query: getSubscribedProjects,
            variables: {
                where,
            },
        }),
    });
    return await projects.json();
}

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        try {
            /* const date = new Date();
            const month = date.getMonth();
            const year = date.getYear(); */
            const projects = await getProjects({
                /* created_at: {
                    _gt: `${month + 1}-01-${year}`,
                }, */
            });
            console.log("projects----", projects);
            const {
                data: { project },
            } = projects;
            const promisses = project.map(async (item) => {
                const {
                    subscriptions: [subscription],
                    sessions_aggregate: {
                        aggregate: { count },
                    },
                } = item;
                const { id } = subscription;
                const session = await stripe(
                    `/subscription_items/${id}/usage_records`,
                    {
                        quantity: count,
                        timestamp: Math.ceil(Date.now() / 1000),
                        action: "set",
                    },
                    "POST"
                );
                return session;
            });
            const data = await Promise.all(promisses);
            return {
                data,
            };
        } catch (e) {
            throw new BadRequestError(e.toString());
        }
    },
};
