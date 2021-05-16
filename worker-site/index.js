import { handleEvent } from "vitedge/worker";

const ALLOWED_METHODS = "GET, POST, OPTIONS, PUT, PATCH";
const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": ALLOWED_METHODS,
    // iOS 12 is broken and doesn't accept only a wildcard, so specify here all the allowed headers:
    "Access-Control-Allow-Headers":
        "*, Accept, Content-Type, Content-Length, Accept-Encoding, Referer, Origin, User-Agent, authorization",

    "Access-Control-Allow-Credentials": "true",

    // Set a cache for the OPTIONS check
    "Access-Control-Max-Age": "600",
};

addEventListener("fetch", (event) => {
    try {
        if (event.request.method === "OPTIONS") {
            event.respondWith(
                new Response(null, {
                    headers: { ...CORS_HEADERS, Allow: ALLOWED_METHODS },
                })
            );
        } else {
            event.respondWith(
                handleEvent(event, {
                    http2ServerPush: {
                        destinations: ["style"],
                    },
                }).then((response) => {
                    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
                        response.headers.set(key, value);
                    });

                    return response;
                })
            );
        }
    } catch (error) {
        event.respondWith(
            new Response(error.message || error.toString(), {
                status: 500,
            })
        );
    }
});
