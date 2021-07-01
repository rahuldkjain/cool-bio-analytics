import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

const createSubscriptionItem = async (input) => {
    try {
        const subscriptionItem = await stripe("/subscription_items", "POST", {
            subscription: input.subscription,
        });
        return subscriptionItem;
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
        return usageReport;
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
        const {
            price,
            usageFees,
            projectFees,
            metadata = {},
        } = await request.json();
        /*
         * price = subscription price, must be a Stripe Price Object
         * usageFees = usage fees for "pay as you go" payment plan, must be a Stripe Price Object
         * projectFees = fees based on total number of projects, must be a Stripe Price Object
         */
        const token = request.headers.get("token");
        console.log("tokeeennnnn-------->", token);
        try {
            const customer = await getCustomer(token);
            console.log("checkout customer", customer);
            const session = await stripe("/checkout/sessions/create", "POST", {
                customer: customer,
                payment_method_types: ["card"],
                billing_address_collection: "required",
                line_items: [
                    {
                        price: price.id,
                        quantity: 1,
                    },
                    {
                        price: usageFees.id
                            ? {
                                  /* Price from usage fees */
                              }
                            : 0,
                        quantity: 1,
                    },
                    {
                        price: projectFees.id
                            ? {
                                  /* Price from # of projects */
                              }
                            : 0,
                        quantity: 1,
                    },
                ],
                mode: "subscription",
                allow_promotion_codes: true,
                subscription_data: {
                    trial_from_plan: true,
                    metadata,
                },
                success_url: `${getUrl()}/projects`,
                cancel_url: `${getUrl()}/`,
            });

            console.log("session", session);

            const subscriptionItem = await createSubscriptionItem(session);

            const usageReport = await createUsageReport(subscriptionItem);

            return {
                data: {
                    sessionId: session.id,
                    subscriptionId: session.subscription,
                    subscriptionItemId: subscriptionItem.id,
                    usageReport: usageReport,
                },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
