import { BadRequestError } from "vitedge/errors";
import { constructEvent } from "@werker/stripe-webhook";
import {
    upsertPriceRecord,
    upsertProductRecord,
} from "../../../utils/database";

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            throw new BadRequestError("Method not supported!");
        }
        const body = await request.text();
        try {
            /* const sig = request.headers.get("stripe-signature");
            if (!sig) {
                throw new BadRequestError("No signature provided in header");
            }
            const event = constructEvent({
                payload: body,
                signature: sig,
                secret: process.env.VITEDGE_STRIPE_WEBHOOK_SIGNING_SECRET,
            }); */

            /* switch (event.type) {
                case "product.created":
                case "product.updated":
                    await upsertProductRecord(event.data.object);
                    break;
                case "price.created":
                case "price.updated":
                    await upsertPriceRecord(event.data.object);
                    break;
                default:
                    console.log("Unknown webhook event type sent");
                    return { data: { type: event.type, ok: true } };
            } */
            return { data: { body, ok: true } };
        } catch (err) {
            console.log(err);
            throw new BadRequestError(err.toString());
        }
    },
};
