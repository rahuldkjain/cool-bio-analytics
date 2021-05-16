import { BadRequestError } from "vitedge/errors";
import jwt from "@tsndr/cloudflare-worker-jwt";
import qs from "qs";

export function getUrl() {
    const url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://analytics.cool.bio";
    return url;
}

export function decodeToken(token) {
    try {
        const isValid = jwt.verify(token, process.env.VITEDGE_HASURA_JWT_TOKEN);
        if (isValid) {
            const payload = jwt.decode(token);
            return payload;
        } else {
            throw new BadRequestError("Method not supported!");
        }
    } catch {
        throw new BadRequestError("Method not supported!");
    }
}

export const corsHeaders = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
};

export async function stripe(path, body, method) {
    const resp = await fetch(`https://api.stripe.com/v1${path}`, {
        ...(method === "POST" ? { body: qs.stringify(body) } : {}),
        headers: {
            Authorization: `Bearer ${process.env.VITEDGE_STRIPE_SECRET_KEY}`,
            "Content-type": "application/x-www-form-urlencoded",
            ...corsHeaders,
        },
        method,
    });

    return await resp.json();
}
