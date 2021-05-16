const query = `
  query checkprojectId($projectId: uuid!) {
    project_by_pk(project_id: $projectId) {
      projectId: project_id
    }
  }
`;

const domainQuery = `
  query checkDomainName($domain: String!) {
    project(where: {domain: {_eq: $domain}}) {
      projectId: project_id
    }
  }
`;

const deleteMutation = `
  mutation checkId($sessionId: uuid!) {
    delete_session_by_pk(session_id: $sessionId) {
      sessionId: session_id
    }
  }
`;

const updateprojectData = `
  mutation checkDomainName($sessionId: uuid!, $projectId: uuid!) {
    update_session_by_pk(pk_columns: {
      session_id: $sessionId
    },
    _set:{
      project_id: $projectId
    }) {
      session_id
    }
  }
`;

async function deleteRecord(sessionId) {
    const deleteCall = await fetch(process.env.VITEDGE_GRAPHQL_API, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
                process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
        },
        body: JSON.stringify({
            query: deleteMutation,
            variables: {
                sessionId,
            },
        }),
    });
    return deleteCall;
}

export default {
    async handler({ request }) {
        const webhookSecret = request.headers.get("webhook-secret");
        if (
            webhookSecret !== process.env.VITEDGE_WORKER_HASURA_WEBHOOK_SECRET
        ) {
            // return new Response("Unauthorized", { status: 403 });
            throw new Error("Unauthorized!");
        }
        if (request.method !== "POST") {
            // return new Response("Blocked Method", { status: 403 });
            throw new Error("Blocked Method!");
        }

        const body = await request.json();

        const {
            event: { data },
        } = body;

        const { new: current } = data;

        if (current.project_id) {
            const postCall = await fetch(process.env.VITEDGE_GRAPHQL_API, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret":
                        process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        projectId: current.project_id,
                    },
                }),
            });
            const response = await postCall.json();
            if (!response.data.project_by_pk) {
                return await deleteRecord(current.session_id);
            }
            return response;
        } else if (current.origin) {
            const postCall = await fetch(process.env.VITEDGE_GRAPHQL_API, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-hasura-admin-secret":
                        process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
                },
                body: JSON.stringify({
                    query: domainQuery,
                    variables: {
                        domain: current?.origin
                            ?.replace(/^(?:www\.)?/i, "")
                            ?.split("/")[0],
                    },
                }),
            });
            const {
                data: { project },
            } = await postCall.json();
            const [projectData] = project;
            const { projectId } = projectData;
            if (projectId) {
                const postCall = await fetch(process.env.VITEDGE_GRAPHQL_API, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "x-hasura-admin-secret":
                            process.env
                                .VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
                    },
                    body: JSON.stringify({
                        query: updateprojectData,
                        variables: {
                            projectId,
                            sessionId: current.session_id,
                        },
                    }),
                });
                return postCall;
            } else {
                return await deleteRecord(current.session_id);
            }
        } else {
            return await deleteRecord(current.session_id);
        }
    },
};
