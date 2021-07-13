import qs from "qs";

export function getUrl() {
    const url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://analytics.cool.bio";
    return url;
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

export function parseQuerystring(request) {
    const replacedUrl = request.url.replace(/#/g, "?");
    console.log("[replacedUrl]", replacedUrl, request.url, request);
    const url = new URL(replacedUrl);
    console.log(
        "[url.searchParams.entries()]",
        Array.from(url.searchParams.entries())
    );
    const query = Array.from(url.searchParams.entries()).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value,
        }),
        {}
    );

    return { url, query };
}
