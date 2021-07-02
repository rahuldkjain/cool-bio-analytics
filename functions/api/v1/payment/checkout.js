import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

// TO-DO: Refactor this to get the productID ifromn either the .env file or the fetch all prices API
const usageFeesProductID = process.env.VITE_USAGE_FEES;

const createSubscriptionItem = async (input) => {
    try {
        const subscriptionItem = await stripe(
            "/subscription_items",
            {
                subscription: input.subscription,
            },
            "POST"
        );
        return { subscriptionItem: subscriptionItem };
    } catch {
        console.log("Error in generating subscription item");
        return null;
    }
};

const createUsageReport = async (input) => {
    try {
        const usageReport = await stripe(
            "/subscription_items/" + input.id + "/usage_records",
            "POST"
        );
        return { usageReport: usageReport };
    } catch {
        console.log("Error in generating usage report");
        return null;
    }
};

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const { price, usageFees, metadata = {} } = await request.json();
        const token = request.headers.get("token");
        console.log("tokeeennnnn-------->", token);
        try {
            const customer = await getCustomer(token);
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
                        {
                            price: usageFeesProductID,
                            quantity: usageFees,
                        },
                    ],
                    mode: "subscription",
                    metadata,
                    success_url: `${getUrl()}/projects`,
                    cancel_url: `${getUrl()}`,
                },
                "POST"
            );

            console.log("session", session);

            const subscriptionItem = await createSubscriptionItem(session);

            const usageReport = await createUsageReport(
                subscriptionItem.subscriptionItem
            );

            return {
                data: {
                    sessionId: session.id,
                    subscriptionId: session.subscription,
                    subscriptionItemId: subscriptionItem.id,
                    usageReport: usageReport.usageReport,
                },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
