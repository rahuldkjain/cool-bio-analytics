import * as queryString from "query-string";

const params = queryString.stringify({
    client_id: process.env.VITEDGE_GITHUB_CLIENT_ID,
    scope: ["read:user", "user:email"].join(" "),
    allow_signup: true,
});

const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

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
