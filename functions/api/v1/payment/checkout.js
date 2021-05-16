import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const { price, quantity = 1, metadata = {} } = await request.json();
        const token = request.headers.get("token");
        console.log("tokeeennnnn-------->", token);
        try {
            const customer = await getCustomer(token);
            console.log("checkout customer", customer);
            const session = await stripe(
                "/checkout/sessions",
                {
                    payment_method_types: ["card"],
                    billing_address_collection: "required",
                    customer,
                    line_items: [
                        {
                            price,
                            quantity,
                        },
                    ],
                    mode: "subscription",
                    allow_promotion_codes: true,
                    subscription_data: {
                        trial_from_plan: true,
                        metadata,
                    },
                    success_url: `${getUrl()}/account`,
                    cancel_url: `${getUrl()}/`,
                },
                "POST"
            );

            return {
                data: { sessionId: session.id },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
