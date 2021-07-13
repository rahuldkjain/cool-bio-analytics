import jwt from "jsonwebtoken";
import { BadRequestError } from "vitedge/errors";
import { checkUser, setUser } from "../../../../utils/database";
import { parseQuerystring } from "../../../../utils/helpers";

async function getTokensFromCode(code) {
    const params = {
        client_id: process.env.VITEDGE_GITHUB_CLIENT_ID,
        client_secret: process.env.VITEDGE_GITHUB_CLIENT_SECRET,
        code,
    };

    const response = await fetch(
        "https://github.com/login/oauth/access_token",
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(params),
        }
    );
    const result = await response.json();
    console.log("[tokens]", result);

    if (result.error) {
        throw new BadRequestError(result.error_description);
    }
    return result;
}

function generateHasuraJWT(user) {
    const claims = {};
    claims["https://hasura.io/jwt/claims"] = {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": String(user.id),
    };
    const secret = process.env.VITEDGE_HASURA_JWT_TOKEN;
    console.log("[claims, scret]", claims, secret);
    return jwt.sign(claims, secret, { algorithm: "HS256", expiresIn: "10h" });
}

async function getUser(token) {
    const getUserResponse = await fetch("https://api.github.com/user", {
        headers: {
            accept: "application/vnd.github.v3+json",
            authorization: `token ${token}`,
        },
    });
    const data = await getUserResponse.json();
    console.log("[provider user data]", data);
    return data;
}

async function postUser(user, tokens) {
    const userData = {
        provider_type: "oauth",
        provider_id: "github",
        provider_account_id: `${user.id}`,
        refresh_token: tokens?.refresh_token || null,
        access_token: tokens?.access_token,
        access_token_expires: tokens?.access_token_expires || null,
        user: {
            data: {
                display_name: user?.name || null,
                email: user?.email || null,
                avatar_url: user?.avatar_url || null,
            },
        },
    };
    const postData = await setUser(userData);
    return postData?.data?.user;
}

export default {
    async handler({ request }) {
        try {
            const { query } = parseQuerystring(request);
            console.log("[code]", query.code);
            if (!query.code) {
                throw new BadRequestError("No code is paased!");
            }
            const tokens = await getTokensFromCode(query.code);
            const accessToken = tokens.access_token;
            const providerUser = await getUser(accessToken);
            const user = await checkUser(`${providerUser?.id}`);
            const hasuraUser = !user
                ? await postUser(providerUser, tokens)
                : user;
            console.log("[hasuraUser]", hasuraUser);
            const jwt = generateHasuraJWT(hasuraUser);
            console.log("[jwt]", jwt);
            const now = new Date();
            now.setTime(now.getTime() + 24 * 3600 * 1000);
            return {
                status: 302,
                headers: {
                    location: "/projects",
                    "Set-Cookie": `__Session-analytics.cool.bio-token=${jwt}; expires=${now.toUTCString()}; path=/;`,
                },
            };
        } catch (e) {
            console.log("[error]", e);
            return {
                status: 302,
                headers: {
                    location: "/404",
                },
            };
        }
    },
};
