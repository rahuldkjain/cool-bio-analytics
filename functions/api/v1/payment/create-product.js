import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

// Creates products (subscription and non-subscription)

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const name = await request.json();
        try {
            const product = await stripe("/products", "POST", {
                name: name,
            });
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
