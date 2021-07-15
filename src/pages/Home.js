import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Image } from "semantic-ui-react";

import PostCard from "../components/PostCard";

// const FETCH_POSTS_QUERY = gql`
//   {
//     getPosts {
//       id
//       username
//       title
//       body
//       tags
//       selectedFile
//       createdAt
//       likeCount
//       likes {
//         id
//         username
//         createdAt
//       }
//       commentCount
//       comments {
//         id
//         username
//         body
//         createdAt
//       }
//     }
//   }
// `;

function Home() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );
  // const { loading, _, data } = useQuery(FETCH_POSTS_QUERY);
  // const { loading, data: { getPosts: posts } = {} } = useQuery(
  //   FETCH_POSTS_QUERY
  // );
  // const posts = [result.data.createPost, ...data.getPosts];
  // proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });

  // const { loading, data: { getPosts } = {} } = useQuery(
  //   FETCH_POSTS_QUERY
  // );

  // if (data) {
  //   console.log("POSTS: ", data);
  // }

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column
              key={post.id}
              style={{
                width: "300px",
                height: "300px",
                border: "1px solid tomato",
                marginBottom: 20,
              }}
            >
              <PostCard post={post} />
              <Image src="https://picsum.photos/300/300" />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

// export const FETCH_POSTS_QUERY = gql`
//   {
//     getPosts {
//       id
//       username
//       title
//       body
//       tags
//       selectedFile
//       likeCount
//       likes {
//         id
//         username
//         createdAt
//       }
//       commentCount
//       comments {
//         id
//         username
//         body
//         createdAt
//       }
//       createdAt
//     }
//   }
// `;

export default Home;

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      title
      body
      tags
      selectedFile
      createdAt
      likeCount
      likes {
        id
        username
        createdAt
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

/*
query{
  getPosts{
    id
    username
    title
    body
    tags
    selectedFile
    likeCount
    likes{
      id
      username
      createdAt
    }
    commentCount
    comments{
      id
      username
      createdAt
    }
    createdAt
  }
}
*/
