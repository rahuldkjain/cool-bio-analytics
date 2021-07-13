import {
    from,
    ApolloClient,
    HttpLink,
    InMemoryCache,
    split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getSessionToken } from "../utils/session";

const wsDataHost = import.meta.env.VITE_GRAPHQL_WS_API;
const httpDataHost = import.meta.env.VITE_GRAPHQL_API;
const hasuraClientName = "hasura-console";
const ssr = typeof window === "undefined";

export const XHasuraClientName = "X-Hasura-Client-Name";
export const AuthorizationHeader = "Authorization";
export const AuthBearer = "Bearer";

export const getIdToken = async () => {
    try {
        const token = getSessionToken() || "";
        return token;
    } catch (e) {
        console.log(e);
        return "";
    }
};

const getBearerToken = (token) => (token ? `${AuthBearer} ${token}` : null);

const authLink = setContext((_, { headers }) =>
    getIdToken().then((token) => {
        return token
            ? {
                  headers: {
                      [AuthorizationHeader]: getBearerToken(token),
                      ...headers,
                  },
              }
            : {
                  ...headers,
                  role: "public",
              };
    })
);

const httpLink = from([
    authLink,
    // errorLink,
    new HttpLink({
        uri: httpDataHost,
        headers: {
            [XHasuraClientName]: hasuraClientName,
        },
    }),
]);

const wsLink = !ssr
    ? new WebSocketLink({
          uri: wsDataHost,
          options: {
              reconnect: true,
              lazy: true,
              timeout: 30000,
              connectionCallback: (error) => {
                  console.error("connection error: ", error);
              },
              connectionParams: () =>
                  getIdToken().then((token) =>
                      token
                          ? {
                                headers: {
                                    [AuthorizationHeader]:
                                        getBearerToken(token),
                                    [XHasuraClientName]: hasuraClientName,
                                },
                            }
                          : {
                                role: "public",
                            }
                  ),
          },
      })
    : null;

const splitLink = (http, ws) =>
    !ssr
        ? split(
              ({ query }) => {
                  const { kind, operation } = getMainDefinition(query);

                  return (
                      kind === "OperationDefinition" &&
                      operation === "subscription"
                  );
              },
              ws,
              http
          )
        : http;

export const authGQLClient = new ApolloClient({
    ssr: ssr,
    cache: new InMemoryCache(),
    link: splitLink(httpLink, wsLink),
});
