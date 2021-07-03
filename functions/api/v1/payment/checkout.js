import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomerByUserId } from "../../../utils/database";

function correctSecretProvided(request) {
    const requiredSecret = process.env.VITEDGE_CHECKOUT_SECRET;
    const providedSecret = request.headers.get("CHECKOUT_SECRET");
    return requiredSecret === providedSecret;
}

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        if (!correctSecretProvided(request)) {
            throw new BadRequestError("Not allowed!");
        }

        const { input, session_variables: session } = await request.json();
        const { price, metadata = {} } = input?.object;
        const userId = session["x-hasura-user-id"];
        try {
            const customer = await getCustomerByUserId(userId);
            console.log("checkout customer", customer);
            const session = await stripe(
                "/checkout/sessions",
                {
                    customer,
                    payment_method_types: ["card"],
                    billing_address_collection: "required",
                    line_items: [
                        {
                            price,
                            quantity: 1,
                        },
                    ],
                    mode: "subscription",
                    metadata,
                    success_url: `${getUrl()}/projects`,
                    cancel_url: `${getUrl()}/projects`,
                },
                "POST"
            );

            console.log("session", session);

            return {
                data: {
                    sessionId: session.id,
                    subscriptionId: session.subscription,
                },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
