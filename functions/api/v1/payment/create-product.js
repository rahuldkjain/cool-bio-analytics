import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

// Creates products (subscription and non-subscription)

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const body = await request.json();
        const { name } = body;
        try {
            const product = await stripe("/products", "POST", {
                name,
            });
            console.log("product", product);
            return {
                data: { product },
            };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.message);
        }
    },
};
