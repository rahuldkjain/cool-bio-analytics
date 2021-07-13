import * as queryString from "query-string";

const params = queryString.stringify({
    client_id: process.env.VITEDGE_GOOGLE_CLIENT_ID,
    redirect_uri: process.env.VITEDGE_GOOGLE_REDIRECT_URL,
    response_type: "code",
    scope: "openid email profile",
    include_granted_scopes: "true",
    state: "pass-through value",
});

const githubLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

export default {
    async handler({ request }) {
        return {
            status: 302,
            headers: {
                location: githubLoginUrl,
            },
        };
    },
};
