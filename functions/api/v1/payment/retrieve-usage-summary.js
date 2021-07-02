import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

// Returns usage record summary for a given subscription item
// This is essencially all usage records for a given user for a given subscriptions

export default {
    async handler({ request }) {
        if (request.method !== "GET") {
            throw new BadRequestError("Method not supported!");
        }
        const id = await request.json();
        try {
            const usageReportSummary = await stripe(
                "/subscription_items/" + id + "/usage_record_summary",
                {},
                "GET"
            );
            console.log("usageReportSummary", usageReportSummary);
            return {
                data: { usageReportSummary: usageReportSummary },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
