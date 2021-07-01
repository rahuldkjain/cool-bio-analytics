import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

// Retrieves all products listed in Stripe Account

export default {
    async handler({ request }) {
        if (request.method !== "GET") {
            throw new BadRequestError("Method not supported!");
        }
        try {
            const productList = await stripe("/products/list", "GET");
            console.log("productList", productList);
            return {
                data: { products: productList },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
