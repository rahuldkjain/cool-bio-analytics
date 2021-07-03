import { BadRequestError } from "vitedge/errors";
import { stripe } from "../../../utils/helpers";

const addCustomerQuery = `
    mutation createCustomer($object: [customers_insert_input!]!) {
        insert_customers(objects: $object) {
            returning {
                id
            }
        }
    }
`;

async function createCustomer(object) {
    const deleteCall = await fetch(process.env.VITEDGE_GRAPHQL_API, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
                process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
        },
        body: JSON.stringify({
            query: addCustomerQuery,
            variables: {
                object,
            },
        }),
    });
    return await deleteCall.json();
}

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const body = await request.json();

        const {
            event: { data },
        } = body;

        const {
            new: { email, user_id: id },
        } = data;
        /* const customer = await stripe.customers.create({
            email,
        }); */
        const customer = await stripe(
            "/customers",
            {
                email,
            },
            "POST"
        );
        const stripeData = await createCustomer({
            stripe_customer_id: customer.id,
            id,
        });
        return {
            data: { stripeData, customer },
        };
    },
};
