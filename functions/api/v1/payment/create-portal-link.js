import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomerByUserId } from "../../../utils/database";

function correctSecretProvided(request) {
    const requiredSecret = process.env.VITEDGE_GET_PORTAL_SECRET;
    const providedSecret = request.headers.get("GET_PORTAL_SECRET");
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
        const { session_variables: session } = await request.json();
        const userId = session["x-hasura-user-id"];

        try {
            const customer = await getCustomerByUserId(userId);
            console.log("checkout customer", customer);
            const session = await stripe(
                "/billing_portal/sessions",
                {
                    customer,
                    return_url: `${getUrl()}/projects`,
                },
                "POST"
            );

            console.log("session", session);

            return {
                data: { url: session?.url },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
