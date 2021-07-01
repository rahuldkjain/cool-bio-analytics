import { BadRequestError } from "vitedge/errors";

import { getUrl, stripe } from "../../../utils/helpers";
import { getCustomer } from "../../../utils/database";

// TO-DO: Revise Price Getting Logic

// Calculates subscription price based on product name
const getPrice = (input) => {
    switch (input) {
        case input.name === "month_hobby":
            return 0;
        case input.name === "month_startup":
            return 5;
        case input.name === "month_PAYG":
            return 5;
        case input.name === "year_hobby":
            return 0;
        case input.name === "year_startup":
            return 50;
        case input.name === "year_PAYG":
            return 50;
        default:
            return 0;
    }
};

// Creates price for subscription-based products
export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const product = await request.json();
        const amount = getPrice(product);
        try {
            const price = await stripe("/prices", "POST", {
                product: product.id,
                unit_amount: amount,
                currency: "usd",
                recurring: {
                    interval: product.name === "year" ? "year" : "month",
                    usage_type: "metered",
                },
            });

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
