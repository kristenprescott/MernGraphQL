import React from "react";
import App from "../App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

const serverURI = process.env.REACT_APP_SERVER_URI;
const httpLink = createHttpLink({
  // ***** DONT FORGET TO CHANGE LATER *****
  uri: `${serverURI}`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
