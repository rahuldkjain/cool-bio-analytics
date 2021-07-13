import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { useMemo } from "react";
import { useAuth } from "../providers/AuthProvider";

const wsDataHost = import.meta.env.VITE_GRAPHQL_WS_API;
const httpDataHost = import.meta.env.VITE_GRAPHQL_API;
const ssr = typeof window === "undefined";

export const useApolloClient = () => {
    const { token } = useAuth();
    const client = useMemo(() => {
        if (token === undefined) {
            return undefined;
        }

        const httpLink = createHttpLink({
            uri: httpDataHost,
            credentials: "include",
        });

        const webSocketLink = !ssr
            ? new WebSocketLink({
                  uri: wsDataHost,
                  options: {
                      reconnect: true,
                      lazy: true,
                      connectionParams: {
                          headers: {
                              authorization: `Bearer ${token}`,
                          },
                      },
                  },
              })
            : null;

        const splitLink = !ssr
            ? split(
                  ({ query }) => {
                      const definition = getMainDefinition(query);
                      return (
                          definition.kind === "OperationDefinition" &&
                          definition.operation === "subscription"
                      );
                  },
                  webSocketLink,
                  httpLink
              )
            : httpLink;

        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${token}`,
                },
            };
        });

        return new ApolloClient({
            ssr: ssr,
            link: authLink.concat(splitLink),
            cache: new InMemoryCache(),
        });
    }, [token]);

    return client;
};
