import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

// Creates Price for One-Time Products
// Such as Usage Fees and Project-based Fees (i.e. non-subscription based fees)

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const { id } = await request.json();
        try {
            const price = await stripe("/prices/" + id, {}, "GET");

            console.log("price", price);

            return {
                data: { price: price },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
