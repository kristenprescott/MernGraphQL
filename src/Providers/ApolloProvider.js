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

// const client = new ApolloClient({
//   // link: authLink.concat(httpLink),
//   link: httpLink,
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: {
//           getPosts: {
//             merge(existing, incoming) {
//               return incoming;
//             },
//           },
//         },
//       },
//     },
//   }),
// });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
