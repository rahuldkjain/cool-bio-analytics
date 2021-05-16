import DeviceDetector from "device-detector-js";

const deviceDetector = new DeviceDetector();

const query = `
  mutation postSession($objects: [session_insert_input!]!) {
    sessionData: insert_session(objects: $objects) {
      returning {
        sessionId: session_id
      }
    }
  }
`;
const updateQuery = `
  mutation updateSession($sessionId: session_pk_columns_input! ,$objects: session_set_input) {
    sessionData: update_session_by_pk(pk_columns: $sessionId, _set: $objects) {
      sessionId: session_id
    }
  }
`;

async function postSession(postCall) {
    const responseData = await postCall.json();

    const {
        data: {
            sessionData: { returning },
        },
    } = responseData;

    const [sessionData] = returning;
    const { sessionId } = sessionData;
    return sessionId;
}

async function updateSession(sessionId) {
    return sessionId;
}

export default {
    async handler({ request }) {
        if (request.method !== "POST") {
            // return new Response("Blocked Method", { status: 403 });
            throw new Error("Method not supported!");
        }
        const userAgent = request.headers.get("User-Agent") || "";
        if (userAgent.includes("bot")) {
            // return new Response("Block User Agent containing bot", { status: 403 });
            throw new Error("Block User Agent containing bot.");
        }

        const {
            projectId,
            pathname,
            referrer,
            sessionId,
        } = await request.json();

        const device = deviceDetector.parse(userAgent);

        const headers = Object.fromEntries(request.headers);
        const origin = request.headers.get("Origin");
        const url = new URL(origin);
        const {
            latitude,
            longitude,
            timezone,
            region,
            country,
            continent,
            city,
            regionCode,
            postalCode,
        } = request.cf;

        const data = {
            ip: headers["x-real-ip"] || headers["cf-connecting-ip"],
            project_id: projectId,
            client_name: device?.client?.name,
            client_type: device?.client?.type,
            client_version: device?.client?.version,
            client_engine: device?.client?.engine,
            os_name: device?.os?.name,
            os_version: device?.os?.version,
            device_type: device?.device?.type,
            device_brand: device?.device?.brand,
            device_model: device?.device?.model,
            language: headers["accept-language"],
            origin: url.hostname,
            protocol: url.protocol,
            latitude,
            longitude,
            timezone,
            region,
            country,
            continent,
            city,
            region_code: regionCode,
            postal_code: postalCode,
            referrer,
            pathname,
        };

        const body = sessionId
            ? {
                  query: updateQuery,
                  variables: {
                      sessionId: {
                          session_id: sessionId,
                      },
                      objects: data,
                  },
              }
            : {
                  query,
                  variables: {
                      objects: data,
                  },
              };

        const postCall = await fetch(process.env.VITEDGE_GRAPHQL_API, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "x-hasura-admin-secret":
                    process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
            },
            body: JSON.stringify(body),
        });

        const returningSessionId = sessionId
            ? await updateSession(sessionId)
            : await postSession(postCall);

        return {
            data: {
                sessionId: returningSessionId,
            },
            options: {
                status: postCall.status,
            },
        };
    },
    options: {
        cache: {
            api: 90,
            html: 90,
        },
    },
};
