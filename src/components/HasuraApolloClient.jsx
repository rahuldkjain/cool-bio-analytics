import PropTypes from "prop-types";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { authGQLClient } from "../providers/ApolloClient";

export function HasuraApolloClient({ children }) {
  return <ApolloProvider client={authGQLClient}>{children}</ApolloProvider>;
}

HasuraApolloClient.propTypes = {
  children: PropTypes.any,
};
