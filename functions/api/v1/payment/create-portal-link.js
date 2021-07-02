import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const token = request.headers.get("token");
        console.log("tokeeennnnn-------->", token);
        try {
            const customer = await getCustomer(token);
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
