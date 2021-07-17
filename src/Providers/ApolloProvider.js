import React from "react";
import App from "../App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

const serverURI = process.env.REACT_APP_SERVER_URI;
const httpLink = createHttpLink({
  // ***** DONT FORGET TO CHANGE LATER *****
  uri: `${serverURI}`,
});

// // takes a request(req) and a previous context(pre), but we don't need those params so they can be omitted
// const authLink = setContext((req, pre) => {
const authLink = setContext(() => {
  const token = localStorage.getItem("jwtoken");
  // console.log("authLink token: ", token);

  // set jwtoken as an Authorization header
  //    should merge the existing headers of the req w this headers object we gave
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // cache: new InMemoryCache({}),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
