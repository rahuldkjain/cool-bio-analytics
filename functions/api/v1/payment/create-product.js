import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

// NOTE: NO LONGER NEEDED, PRODUCTS ALREADY SET IN THE DASHBOARD

// Creates products (subscription and non-subscription)

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const name = await request.json();
        try {
            const product = await stripe(
                "/products",
                {
                    name: name,
                },
                "POST"
            );
            console.log("product", product);
            return {
                data: { product: product },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
