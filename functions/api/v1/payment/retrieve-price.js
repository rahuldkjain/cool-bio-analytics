import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

// NOTE: NO LONGER NEEDED, PRICES ARE FETCHED FROM DATABASE

// Retrieves Price for all Products

export default {
    async handler({ request }) {
        if (request.method !== "GET") {
            throw new BadRequestError("Method not supported!");
        }
        try {
            const priceList = await stripe("/prices", {}, "GET");
            console.log("priceList", priceList);
            return {
                data: { prices: priceList },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
