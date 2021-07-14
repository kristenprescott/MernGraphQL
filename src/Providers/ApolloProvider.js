// https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/
// https://www.apollographql.com/docs/react/get-started/
import React from "react";
import App from "../App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   //   useQuery,
//   //   gql,
// } from "@apollo/client";
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

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
//   // Provide some optional constructor fields
//   name: "MernGraphQL",
//   version: "0.0.1",
//   ssrMode: true,
//   // ssrMode: When using Apollo Client for server-side rendering, set this to true so that the getDataFromTree function can work effectively.
//   //   ssrForceFetchDelay: 3000,
//   //   // ssrForceFetchDelay: The time interval (in milliseconds) before Apollo Client force-fetches queries after a server-side render.
//   connectToDevTools: true,
//   // connectToDevTools: If true, the Apollo Client Devtools browser extension can connect to Apollo Client in your production environment. The extension can always connect in a non-production environment.
//   queryDeduplication: false,
//   // queryDeduplication: default=false, If false, Apollo Client sends every created query to the server, even if a completely identical query (identical in terms of query string, variable values, and operationName) is already in flight.
//   defaultOptions: {
//     watchQuery: {
//       // Note: The useQuery hook uses Apollo Client's watchQuery function. To set defaultOptions when using the useQuery hook, make sure to set them under the defaultOptions.watchQuery property.
//       fetchPolicy: "cache-and-network",
//       errorPolicy: "ignore",
//     },
//     query: {
//       // context:  Context to be passed to link execution chain
//       fetchPolicy: "network-only",
//       errorPolicy: "all",
//       notifyOnNetworkStatusChange: true,
//       returnPartialData: true,
//     },
//     mutate: {
//       //   fetchPolicy: Extract<"cache-first" | "network-only" | "cache-only" | "no-cache" | "standby", "no-cache">,
//       //   // Specifies the FetchPolicy to be used for this query. Mutations only support a 'no-cache' fetchPolicy. If you don't want to disable the cache, remove your fetchPolicy setting to proceed with the default mutation behavior.
//       errorPolicy: "all",
//     },
//     subscribe: {
//       fetchPolicy: "network-only",
//       errorPolicy: "none",
//     },
//   },
// });

// client
//   .query({
//     query: gql`
//       query posts {
//         getPosts {
//           id
//           username
//           title
//           body
//           selectedFile
//           tags
//           likes {
//             id
//             username
//             createdAt
//           }
//           comments {
//             id
//             username
//             body
//             createdAt
//           }
//           likeCount
//           commentCount
//           createdAt
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

export default (
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
