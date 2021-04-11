import { API_ROOT_URL } from "../../../../src/config/constants";

const query = `
  query checkWebsiteId($websiteId: uuid!) {
    website_by_pk(website_id: $websiteId) {
        website_id
    }
  }
`;

const deleteMutation = `
  mutation checkId($sessionId: uuid!) {
    delete_session_by_pk(session_id: $sessionId) {
      session_id
    }
  }
`;

export default async ({ request }) => {
  const webhookSecret = request.headers.get("webhook-secret");
  if (webhookSecret !== process.env.VITEDGE_WORKER_HASURA_WEBHOOK_SECRET) {
    // return new Response("Unauthorized", { status: 403 });
    throw new Error('Unauthorized!')
  }
  if (request.method !== "POST") {
    // return new Response("Blocked Method", { status: 403 });
    throw new Error('Blocked Method!')
  }

  const body = await request.json();

  const {
    event: { data },
  } = body;

  const { new: current } = data;

  if (current.website_id) {
    const postCall = await fetch(API_ROOT_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
      },
      body: JSON.stringify({
        query,
        variables: {
          websiteId: current.website_id,
        },
      }),
    });
    const response = await postCall.json();
    if (!response.data.website_by_pk) {
      const deleteCall = await fetch(API_ROOT_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret":
            process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: deleteMutation,
          variables: {
            sessionId: current.session_id,
          },
        }),
      });
      return deleteCall;
    }
  }

  return {
    data: {
      websiteId: current.website_id,
    },
  };
};
